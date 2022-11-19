import logger from './src/logger';

interface SourceInfo {
  name: string;
  version: string;
};

export namespace core {
  export const initSource = async (source: SourceInfo) => {
    const session = await logger.init({ _type: 'source', source });
    console.log(`[${source.name} v${source.version}] Session: ${session}`);
    return session;
  };
};

export * from './src/env';
export * from './src/mongo';
export * from './src/logger';
export * from './src/request';
export * from './src/module';
