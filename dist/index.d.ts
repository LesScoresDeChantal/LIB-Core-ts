interface SourceInfo {
    name: string;
    version: string;
}
export declare const initSource: (source: SourceInfo) => Promise<import("bson").ObjectID>;
export {};
