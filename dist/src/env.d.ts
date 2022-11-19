export declare namespace env {
    /**
     * Get an environment variable.
     * @param key The environment variable key.
     * @param defVal The default value.
     */
    const get: (key: string, defVal?: string) => string;
}
export default env;
