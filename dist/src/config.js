"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("../env"));
const version_1 = __importDefault(require("../version"));
const version = (0, version_1.default)([
    `${__dirname.replace(/\/src$/, '')}`,
    `${__dirname.replace(/\/dist\/src$/, '')}`,
]);
if (version)
    console.log(`[Core v${version}] Loading...`);
exports.default = {
    core: {
        version,
        lang: 'ts',
    },
    mongoUrl: (0, env_1.default)('MONGO_URL'),
    database: (0, env_1.default)('MONGO_DB', 'collectests'),
    NOLOG: (0, env_1.default)('NOLOG', ''),
};
