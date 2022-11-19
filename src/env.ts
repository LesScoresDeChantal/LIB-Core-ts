import fs from 'fs';

const envFilePaths = [
  require.main.path,
  process.env['PWD'],
  process.env['INIT_CWD'],
];

const envFiles: string[] = [];

for (const path of envFilePaths) {
  if (!envFiles.includes(`${path}/.env`)) envFiles.push(`${path}/.env`);
}

for (const envFile of envFiles) {
  if (!fs.existsSync(envFile)) continue;
  fs.readFileSync(envFile, 'utf8')
    .replace(/\r/g, '')
    .split('\n')
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => line.split('='))
    .forEach(([key, ...value]) => {
      process.env[key] = value.join('=');
    });
  console.log(`Loaded env file: '${envFile}'`);
}

export namespace env {
  /**
   * Get an environment variable.
   * @param key The environment variable key.
   * @param defVal The default value.
   */
  export const get = (key: string, defVal?: string): string => {
    const value = process.env[key] ?? defVal;

    if (value === undefined) {
      console.error(`Missing environment variable '${key}'`);
      process.exit(1);
    }

    return value;
  };
};

export default env;
