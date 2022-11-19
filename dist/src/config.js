"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./env"));
const module_1 = __importDefault(require("./module"));
const pkg = module_1.default.get([
    `${__dirname.replace(/\/src$/, '')}`,
    `${__dirname.replace(/\/dist\/src$/, '')}`,
]);
const mod = module_1.default.parse(pkg);
if (pkg.version)
    console.log(`[${mod.name} v${pkg.version}] Loading...`);
exports.default = {
    core: {
        version: mod.version,
        lang: mod.lang,
    },
    mongoUrl: env_1.default.get('MONGO_URL'),
    database: env_1.default.get('MONGO_DB', 'collectests'),
    NOLOG: env_1.default.get('NOLOG', ''),
};
