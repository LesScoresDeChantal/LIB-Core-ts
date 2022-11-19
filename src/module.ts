import fs from 'fs';
import { type } from 'os';

interface PackageInfo {
  name: string;
  version: string;
  [key: string]: any;
}

function searchIn(path: string): PackageInfo | null {
  try {
    const rawPkg = fs.readFileSync(`${path}/package.json`, 'utf8');
    return JSON.parse(rawPkg) ?? null;
  } catch (error) {
    return null;
  }
}

export namespace module {
  /**
   * Get the version of the package
   * @param {string} paths Directories to search for package.json
   * @returns The version of the package
   */
  export const get = (paths: string[]): PackageInfo => {
    for (const path of paths) {
      const rs = searchIn(path);
      if (rs) return rs;
    }

    throw new Error(`Failed to find package.json in \n  - '${paths.join('\'\n  - \'')}'`);
  };

  interface ModuleInfo {
    type: 'SOURCE' | 'LIB' | 'SERVICE' | string;
    name: string;
    lang: 'ts' | 'js' | string;
    version: string;
  }

  export const parse = (pkg: PackageInfo): ModuleInfo => {
    const splittedName = pkg.name.split('-');
    const upperFirst = (str: string) => str[0].toUpperCase() + str.slice(1);
    return {
      type: splittedName[0].toUpperCase(),
      name: upperFirst(splittedName[1]),
      lang: splittedName[2],
      version: pkg.version,
    };
  }
};

export default module;
