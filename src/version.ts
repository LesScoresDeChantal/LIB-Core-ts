import fs from 'fs';

let version = 'unknown';

function getFileRawContent(path: string) {
  try {
    const rawPkg = fs.readFileSync(path, 'utf8');
    return rawPkg;
  } catch (error) {
    console.log('[Core]: \'package.json\' file not found.');
  }
}

function parseJSON(rawContent: string) {
  try {
    const rs = JSON.parse(rawContent);
    return rs;
  } catch (error) {
    console.error('[Core]: Can\'t parse \'package.json\' file');
  }
}

function tryWith(path: string) {
  const rawContent = getFileRawContent(path);
  const content = parseJSON(rawContent);
  if (!content.version) console.error('No \'version\' property in \'package.json\' file');
  else version = content.version;
}

tryWith('./package.json');

export default version;
