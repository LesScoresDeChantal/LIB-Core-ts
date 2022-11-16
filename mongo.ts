import { MongoClient } from 'mongodb';
import config from './src/config';

console.log('[MongoDB] Connecting...');

const mongoClient = new MongoClient(config.mongoUrl, config.mongoOptions);
const db = mongoClient.db(config.database);

export { mongoClient, db };
