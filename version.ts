import fs from 'fs';

function searchIn(path: string): string | null {
  try {
    const rawPkg = fs.readFileSync(`${path}/package.json`, 'utf8');
    const content = JSON.parse(rawPkg);
    return content.version ?? null;
  } catch (error) {
    return null;
  }
}

/**
 * Get the version of the package
 * @param {string} paths Directories to search for package.json
 * @returns The version of the package
 */
export default (paths: string[]): string | null => {
  for (const path of paths) {
    const rs = searchIn(path);
    if (rs) return rs;
  }

  return null;
};
