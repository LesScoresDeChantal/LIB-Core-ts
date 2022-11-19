"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const os_1 = __importDefault(require("os"));
const config_1 = __importDefault(require("./config"));
const mongo_1 = __importDefault(require("./mongo"));
const LOGGER_DISABLED = config_1.default.NOLOG;
var logger;
(function (logger) {
    function init(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (LOGGER_DISABLED)
                return null;
            if (logger.session)
                return logger.session;
            const runsColl = mongo_1.default.db.collection('_RUNS');
            const sessionDoc = yield runsColl.insertOne(Object.assign(Object.assign({ _startTime: new Date(), _endTime: null, _status: 'RUNNING', _fullStatus: [], _logs: [] }, data), { core: config_1.default.core, process: {
                    filename: __filename,
                    processTitle: process.title,
                    nodeVersion: process.version,
                }, machine: {
                    hostname: os_1.default.hostname(),
                    platform: process.platform,
                    arch: process.arch,
                    uptime: os_1.default.uptime(),
                    totalmem: os_1.default.totalmem(),
                    freemem: os_1.default.freemem(),
                    cpus: os_1.default.cpus(),
                    version: os_1.default.version(),
                } }));
            logger.session = sessionDoc.insertedId;
            return logger.session;
        });
    }
    logger.init = init;
    function log(type, ...messages) {
        return __awaiter(this, void 0, void 0, function* () {
            if (LOGGER_DISABLED)
                return;
            if (!logger.session) {
                yield new Promise((resolve) => setTimeout(resolve, 1000));
                if (!logger.session)
                    return;
            }
            const logsColl = mongo_1.default.db.collection('_LOGS');
            const logDoc = yield logsColl.insertOne({
                _time: new Date(),
                _session: { $ref: '_RUNS', $id: logger.session },
                type,
                messages,
            });
            const runsColl = mongo_1.default.db.collection('_RUNS');
            yield runsColl.updateOne({ _id: logger.session }, {
                $push: {
                    _logs: { $ref: '_LOGS', $id: logDoc.insertedId },
                },
            });
        });
    }
    logger.log = log;
    function exit(status, fullStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            const exitCode = status === 'SUCCESS' ? 0 : 1;
            if (LOGGER_DISABLED)
                process.exit(exitCode);
            if (!logger.session) {
                yield new Promise((resolve) => setTimeout(resolve, 1000));
                if (!logger.session)
                    process.exit(exitCode);
            }
            const runsColl = mongo_1.default.db.collection('_RUNS');
            yield runsColl.updateOne({ _id: logger.session }, {
                $set: {
                    _endTime: new Date(),
                    _status: status,
                    _fullStatus: fullStatus,
                },
            });
            // On force la fermeture du processus au bout de 2 secondes au cas où
            setTimeout(() => process.exit(exitCode), 2000);
            // On ferme la connexion à la base de données
            yield mongo_1.default.mongoClient.close();
            process.exit(exitCode);
        });
    }
    logger.exit = exit;
})(logger = exports.logger || (exports.logger = {}));
;
exports.default = logger;
