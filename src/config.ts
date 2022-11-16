import getEnv from '../env';
import version from './version';
import type { MongoClientOptions } from 'mongodb';

export default {
  core: {
    version,
    lang: 'ts',
  },

  mongoUrl: getEnv('MONGO_URL'),
  database: getEnv('MONGO_DB', 'collectests'),

  NOLOG: getEnv('NOLOG', ''),
} as {
  core: {
    version: string;
    lang: string;
  };

  mongoUrl: string;
  mongoOptions?: MongoClientOptions;
  database: string;

  NOLOG?: string;
};
