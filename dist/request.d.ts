/// <reference types="node" />
import type { OutgoingHttpHeaders } from 'http';
export declare function getRAW(url: string, headers?: OutgoingHttpHeaders): Promise<string>;
export declare function get(url: string, headers?: OutgoingHttpHeaders): Promise<any>;
declare type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | string;
export declare function requestRAW(method: HTTPMethod, url: string, headers?: OutgoingHttpHeaders, body?: any): Promise<string>;
export declare function request(method: HTTPMethod, url: string, headers?: OutgoingHttpHeaders, body?: any): Promise<any>;
export {};
