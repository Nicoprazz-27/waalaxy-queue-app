import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testMatch: ['<rootDir>/dist/tests/**/*.test.js'],
};

export default config;