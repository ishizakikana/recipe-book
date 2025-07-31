module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
  },
  collectCoverage: true,
  coverageReporters: ['text', 'html', 'lcov', 'json'],
  coverageDirectory: 'coverage/jest'
};