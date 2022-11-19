import type { MongoClientOptions } from 'mongodb';
declare const _default: {
    core: {
        version: string;
        lang: string;
    };
    mongoUrl: string;
    mongoOptions?: MongoClientOptions;
    database: string;
    NOLOG?: string;
};
export default _default;
