import env from './env';
import module from './module';
import type { MongoClientOptions } from 'mongodb';

const pkg = module.get([
  `${__dirname.replace(/\/src$/, '')}`,
  `${__dirname.replace(/\/dist\/src$/, '')}`,
]);

const mod = module.parse(pkg);
if (pkg.version) console.log(`[${mod.name} v${pkg.version}] Loading...`);

export default {
  core: {
    version: mod.version,
    lang: mod.lang,
  },

  mongoUrl: env.get('MONGO_URL'),
  database: env.get('MONGO_DB', 'collectests'),

  NOLOG: env.get('NOLOG', ''),
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
