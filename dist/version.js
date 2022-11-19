"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function searchIn(path) {
    var _a;
    try {
        const rawPkg = fs_1.default.readFileSync(`${path}/package.json`, 'utf8');
        const content = JSON.parse(rawPkg);
        return (_a = content.version) !== null && _a !== void 0 ? _a : null;
    }
    catch (error) {
        return null;
    }
}
/**
 * Get the version of the package
 * @param {string} paths Directories to search for package.json
 * @returns The version of the package
 */
exports.default = (paths) => {
    for (const path of paths) {
        const rs = searchIn(path);
        if (rs)
            return rs;
    }
    return null;
};
