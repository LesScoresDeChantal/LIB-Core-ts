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
exports.request = void 0;
const https_1 = __importDefault(require("https"));
var request;
(function (request_1) {
    function getRAW(url, headers = {}) {
        return new Promise((resolve, reject) => {
            const req = https_1.default.get(url, { headers }, (res) => {
                let data = '';
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => { resolve(data); });
            });
            req.on('error', reject);
            req.end();
        });
    }
    request_1.getRAW = getRAW;
    function get(url, headers = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield getRAW(url, headers);
            try {
                return JSON.parse(data);
            }
            catch (error) {
                throw new Error(`Failed to parse JSON from '${url}': ${error.message}`);
            }
        });
    }
    request_1.get = get;
    function requestRAW(method, url, headers = {}, body) {
        return new Promise((resolve, reject) => {
            const req = https_1.default.request(url, {
                method, headers,
            }, (res) => {
                let data = '';
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => { resolve(data); });
            });
            req.on('error', reject);
            if (body)
                req.end(body);
            else
                req.end();
        });
    }
    request_1.requestRAW = requestRAW;
    function request(method, url, headers = {}, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield requestRAW(method, url, headers, body);
            try {
                return JSON.parse(data);
            }
            catch (error) {
                throw new Error(`Failed to parse JSON from '${url}': ${error.message}`);
            }
        });
    }
    request_1.request = request;
})(request = exports.request || (exports.request = {}));
;
exports.default = request;
