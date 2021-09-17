/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const path = require('path');
const projectRoot = path.resolve('.');

// `jest` Test Suites must be run serially
//   @see test/helpers/globalLifecycleDatabase.ts
//   @see package.json + 'jest -i ...'
// "why not use { maxConcurrency: 1 } ?"
//   it only relates to `test.concurrent`
// "why not use { maxWorkers: 1 } ?"
//   same as above
// "why not use `jest --runInBand` ?"
//   oh, believe me, i tried ... but the Test Suites still ran in parallel ಠ_ಠ
//   fortunately, `jest -i` does the trick

// eslint-disable-next-line no-undef
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,js}'],
  // coveragePathIgnorePatterns: ['<rootDir>/test/helpers/'],
  coverageDirectory: '<rootDir>/test_reports/',
  coverageReporters: ['json', 'lcov', 'text'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      diagnostics: {
        warnOnly: false, // In Case of Emergency Break Glass
      },
    },
  },
  //globalSetup: '<rootDir>/test/helpers/globalSetup.js',
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    // https://github.com/kulshekhar/ts-jest/issues/414
    //   "Does not resolve path from tsconfig.js 'paths' option."
    //   so replicate the 'compilerOptions.paths' from `tsconfig.json` here
    //   autobot:  https://kulshekhar.github.io/ts-jest/user/config/#paths-mapping
    '^[@]controllers/(.+)': '<rootDir>/src/controllers/$1',
    '^[@]service/(.+)': '<rootDir>/src/service/$1',
    '^[@]repositories/(.+)': '<rootDir>/src/repositories/$1',
    '^[@]connectors/(.+)': '<rootDir>/src/connectors/$1',
    '^[@]middlewares/(.+)': '<rootDir>/src/middlewares/$1',
    '^[@]utils/(.+)': '<rootDir>/src/utils/$1',
  },
  preset: 'ts-jest/presets/js-with-ts',
  rootDir: projectRoot,
  // setupFilesAfterEnv: [
  //   '<rootDir>/test/helpers/globalLifecycleDatabase.ts',
  //   '<rootDir>/test/helpers/globalLifecycleNock.ts',
  // ],
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.spec.{ts,js}', '<rootDir>/src/**/*.test.{ts,js}', '<rootDir>/test/**/*.{ts,js}'],
  testPathIgnorePatterns: ['/test/fixtures/.+$', '/test/helpers/.+$'],
  transform: {
    '^.+\\.(ts|js)$': 'ts-jest',
  },
  verbose: true,
};
