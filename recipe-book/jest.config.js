module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  testMatch: [
    '**/tests/**/*.test.ts',
    '**/tests/**/*.test.tsx'
  ],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'ts-jest', {
        tsconfig: 'tsconfig.jest.json',
        isolatedModules: true
      }
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@lib/(.*)$': '<rootDir>/src/lib/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/app/*.tsx',
    '!src/app/login/layout.tsx',
    '!src/app/**/recipe/page.tsx',
    '!src/app/**/recipe/**/default.tsx',
    '!src/app/**/recipe/**/edit/page.tsx',
    '!src/app/**/calendar/page.tsx',
    '!src/**/components/**/*.tsx',
    '!src/**/types/**/*.ts',
    '!src/generated/prisma/**/*.ts',
    '!src/lib/emotion.ts',
    '!src/styles/**',
  ],
  coverageReporters: ['text', 'html', 'lcov', 'json'],
  coverageDirectory: 'coverage/jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};