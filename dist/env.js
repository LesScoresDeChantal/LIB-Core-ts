"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const envFilePaths = [
    require.main.path,
    process.env['PWD'],
    process.env['INIT_CWD'],
];
const envFiles = [];
for (const path of envFilePaths) {
    if (!envFiles.includes(`${path}/.env`))
        envFiles.push(`${path}/.env`);
}
for (const envFile of envFiles) {
    if (!fs_1.default.existsSync(envFile))
        continue;
    fs_1.default.readFileSync(envFile, 'utf8')
        .replace(/\r/g, '')
        .split('\n')
        .filter((line) => line && !line.startsWith('#'))
        .map((line) => line.split('='))
        .forEach(([key, ...value]) => {
        process.env[key] = value.join('=');
    });
    console.log(`Loaded env file: '${envFile}'`);
}
/**
 * Get an environment variable.
 * @param key The environment variable key.
 * @param defVal The default value.
 */
exports.default = (key, defVal) => {
    var _a;
    const value = (_a = process.env[key]) !== null && _a !== void 0 ? _a : defVal;
    if (value === undefined) {
        console.error(`Missing environment variable '${key}'`);
        process.exit(1);
    }
    return value;
};
