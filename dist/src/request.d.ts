/// <reference types="node" />
import type { OutgoingHttpHeaders } from 'http';
export declare namespace request {
    export function getRAW(url: string, headers?: OutgoingHttpHeaders): Promise<string>;
    export function get(url: string, headers?: OutgoingHttpHeaders): Promise<any>;
    type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | string;
    export function requestRAW(method: HTTPMethod, url: string, headers?: OutgoingHttpHeaders, body?: any): Promise<string>;
    export function request(method: HTTPMethod, url: string, headers?: OutgoingHttpHeaders, body?: any): Promise<any>;
    export {};
}
export default request;
