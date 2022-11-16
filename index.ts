import { initLogger } from './logger';

interface SourceInfo {
  name: string;
  version: string;
};

export const initSource = async (source: SourceInfo) => {
  const session = await initLogger({ _type: 'source', source });
  console.log(`[${source.name} v${source.version}] Session: ${session}`);
  return session;
};
