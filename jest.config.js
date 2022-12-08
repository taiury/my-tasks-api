/* eslint-disable */
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  bail: true,
  testMatch: ['**/tests/**/*.(test|spec).[jt]s?(x)'],
  collectCoverage: false,
  collectCoverageFrom: ['src/**'],
  coverageDirectory: 'coverage',
};
