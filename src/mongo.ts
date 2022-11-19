import { MongoClient } from 'mongodb';
import config from './config';

console.log('[MongoDB] Connecting...');

export namespace mongo {
  export const client = new MongoClient(config.mongoUrl, config.mongoOptions);
  export const db = client.db(config.database);
};

export default mongo;
