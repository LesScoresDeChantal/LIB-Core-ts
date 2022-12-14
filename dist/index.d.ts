interface SourceInfo {
    name: string;
    version: string;
}
export declare namespace core {
    const initSource: (source: SourceInfo) => Promise<import("bson").ObjectID>;
}
export * from './src/env';
export * from './src/mongo';
export * from './src/logger';
export * from './src/request';
export * from './src/module';
