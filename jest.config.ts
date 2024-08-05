/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from "jest";

const config: Config = {
  preset: "ts-jest",
  transform: {
    "^.+\\.[tj]sx?$": [
      "ts-jest", {
        tsconfig: "tsconfig.test.json"
      }
    ], 
  },
  testEnvironment: "jsdom",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/public/"
  ],

  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
  clearMocks: true,
  restoreMocks: true,
  fakeTimers: { enableGlobally: true },

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  // Default reporters
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  moduleNameMapper: {
    "\\.css$": "<rootDir>/test/css-mock.ts",
    "\\.svg$": "<rootDir>/test/svg-mock.ts"
  }
};

export default config;
