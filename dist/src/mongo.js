"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongo = void 0;
const mongodb_1 = require("mongodb");
const config_1 = __importDefault(require("./config"));
console.log('[MongoDB] Connecting...');
var mongo;
(function (mongo) {
    mongo.mongoClient = new mongodb_1.MongoClient(config_1.default.mongoUrl, config_1.default.mongoOptions);
    mongo.db = mongo.mongoClient.db(config_1.default.database);
})(mongo = exports.mongo || (exports.mongo = {}));
;
exports.default = mongo;
