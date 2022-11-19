"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.mongoClient = void 0;
const mongodb_1 = require("mongodb");
const config_1 = __importDefault(require("./src/config"));
console.log('[MongoDB] Connecting...');
const mongoClient = new mongodb_1.MongoClient(config_1.default.mongoUrl, config_1.default.mongoOptions);
exports.mongoClient = mongoClient;
const db = mongoClient.db(config_1.default.database);
exports.db = db;
