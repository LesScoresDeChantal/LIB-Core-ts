import os from 'os';
import type { ObjectId } from 'mongodb';
import config from './src/config';
import { db, mongoClient } from './mongo';

const LOGGER_DISABLED = config.NOLOG;

export let session: ObjectId;

export async function initLogger(data: { [key: string]: any }) {
  if (LOGGER_DISABLED) return null;

  const runsColl = db.collection('_RUNS');
  const sessionDoc = await runsColl.insertOne({
    _startTime: new Date(),
    _endTime: null,
    _status: 'RUNNING',
    _fullStatus: [],
    _logs: [],
    ...data,
    core: config.core,
    process: {
      filename: __filename,
      processTitle: process.title,
      nodeVersion: process.version,
    },
    machine: {
      hostname: os.hostname(),
      platform: process.platform,
      arch: process.arch,
      uptime: os.uptime(),
      totalmem: os.totalmem(),
      freemem: os.freemem(),
      cpus: os.cpus(),
      version: os.version(),
    },
  });

  session = sessionDoc.insertedId;
  return session;
};

type LogType = 'ERROR' | 'WARN' | 'INFO';

export async function log(type: LogType, ...messages: any[]) {
  if (LOGGER_DISABLED) return;
  if (!session) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!session) return;
  }

  const logsColl = db.collection('_LOGS');
  const logDoc = await logsColl.insertOne({
    _time: new Date(),
    _session: { $ref: '_RUNS', $id: session },
    type,
    messages,
  });

  const runsColl = db.collection('_RUNS');
  await runsColl.updateOne(
    { _id: session },
    {
      $push: {
        _logs: { $ref: '_LOGS', $id: logDoc.insertedId },
      },
    },
  );
}

type SessionStatus = 'SUCCESS' | 'FAILED';

export async function exit(status: SessionStatus, fullStatus?: { [k: string]: any }) {
  const exitCode = status === 'SUCCESS' ? 0 : 1;
  if (LOGGER_DISABLED) process.exit(exitCode);
  if (!session) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!session) process.exit(exitCode);
  }

  const runsColl = db.collection('_RUNS');
  await runsColl.updateOne(
    { _id: session },
    {
      $set: {
        _endTime: new Date(),
        _status: status,
        _fullStatus: fullStatus,
      },
    },
  );

  // On force la fermeture du processus au bout de 2 secondes au cas où
  setTimeout(() => process.exit(exitCode), 2000);

  // On ferme la connexion à la base de données
  await mongoClient.close();
  process.exit(exitCode);
}
