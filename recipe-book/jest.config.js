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
  coverageReporters: ['default'],
  coverageDirectory: 'coverage/jest', // nyc用に出力先を変更
};