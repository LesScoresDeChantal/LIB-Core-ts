interface SourceInfo {
    name: string;
    version: string;
}
export declare namespace core {
    const initSource: (source: SourceInfo) => Promise<import("bson").ObjectID>;
}
export * from './env';
export * from './mongo';
export * from './logger';
export * from './request';
export * from './module';
