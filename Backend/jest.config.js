export default {
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  testEnvironment: "node",
  verbose: true,
  testMatch: ["**/tests/**/*.test.js"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  transformIgnorePatterns: [],
  moduleFileExtensions: ["js", "json"],
  testTimeout: 10000,
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};
