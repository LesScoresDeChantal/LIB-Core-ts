interface PackageInfo {
    name: string;
    version: string;
    [key: string]: any;
}
export declare namespace module {
    /**
     * Get the version of the package
     * @param {string} paths Directories to search for package.json
     * @returns The version of the package
     */
    export const get: (paths: string[]) => PackageInfo;
    interface ModuleInfo {
        type: 'SOURCE' | 'LIB' | 'SERVICE' | string;
        name: string;
        lang: 'ts' | 'js' | string;
        version: string;
    }
    export const parse: (pkg: PackageInfo) => ModuleInfo;
    export {};
}
export default module;
