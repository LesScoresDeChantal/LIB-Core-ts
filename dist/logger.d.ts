import type { ObjectId } from 'mongodb';
export declare let session: ObjectId;
export declare function initLogger(data: {
    [key: string]: any;
}): Promise<ObjectId>;
declare type LogType = 'ERROR' | 'WARN' | 'INFO';
export declare function log(type: LogType, ...messages: any[]): Promise<void>;
declare type SessionStatus = 'SUCCESS' | 'FAILED';
export declare function exit(status: SessionStatus, fullStatus?: {
    [k: string]: any;
}): Promise<void>;
export {};
