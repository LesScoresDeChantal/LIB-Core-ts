import getEnv from '../env';
import getVersion from '../version';
import type { MongoClientOptions } from 'mongodb';

const version = getVersion([
  `${__dirname.replace(/\/src$/, '')}`,
  `${__dirname.replace(/\/dist\/src$/, '')}`,
]);

if (version) console.log(`[Core v${version}] Loading...`);

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
