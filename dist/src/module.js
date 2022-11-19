"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.module = void 0;
const fs_1 = __importDefault(require("fs"));
function searchIn(path) {
    var _a;
    try {
        const rawPkg = fs_1.default.readFileSync(`${path}/package.json`, 'utf8');
        return (_a = JSON.parse(rawPkg)) !== null && _a !== void 0 ? _a : null;
    }
    catch (error) {
        return null;
    }
}
var module;
(function (module) {
    /**
     * Get the version of the package
     * @param {string} paths Directories to search for package.json
     * @returns The version of the package
     */
    module.get = (paths) => {
        for (const path of paths) {
            const rs = searchIn(path);
            if (rs)
                return rs;
        }
        throw new Error(`Failed to find package.json in \n  - '${paths.join('\'\n  - \'')}'`);
    };
    module.parse = (pkg) => {
        const splittedName = pkg.name.split('-');
        const upperFirst = (str) => str[0].toUpperCase() + str.slice(1);
        return {
            type: splittedName[0].toUpperCase(),
            name: upperFirst(splittedName[1]),
            lang: splittedName[2],
            version: pkg.version,
        };
    };
})(module = exports.module || (exports.module = {}));
;
exports.default = module;
