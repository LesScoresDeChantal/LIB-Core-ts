import type { ObjectId } from 'mongodb';
export declare namespace logger {
    export let session: ObjectId;
    export function init(data: {
        [key: string]: any;
    }): Promise<ObjectId>;
    type LogType = 'ERROR' | 'WARN' | 'INFO';
    export function log(type: LogType, ...messages: any[]): Promise<void>;
    type SessionStatus = 'SUCCESS' | 'FAILED';
    export function exit(status: SessionStatus, fullStatus?: {
        [k: string]: any;
    }): Promise<void>;
    export {};
}
export default logger;
