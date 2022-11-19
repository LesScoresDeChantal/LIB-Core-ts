import { MongoClient } from 'mongodb';
import config from './config';

console.log('[MongoDB] Connecting...');

export namespace mongo {
  export const mongoClient = new MongoClient(config.mongoUrl, config.mongoOptions);
  export const db = mongoClient.db(config.database);
};

export default mongo;
