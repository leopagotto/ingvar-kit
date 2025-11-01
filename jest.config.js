module.exports = {
  displayName: 'Ingvar Kit Tests',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js', '**/tests/**/*.test.tsx'],
  collectCoverageFrom: [
    'lib/team/**/*.js',
    'lib/commands/**/*.js',
    'templates/cwds-components/**/*.tsx',
    '!lib/team/**/*.test.js',
    '!lib/commands/**/*.test.js',
    '!templates/cwds-components/**/*.test.tsx',
    '!templates/cwds-components/index.ts',
    '!node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 30,
      lines: 20,
      statements: 20
    }
  },
  verbose: true,
  testTimeout: 10000,
  // React/TypeScript support
  projects: [
    {
      displayName: 'node',
      testEnvironment: 'node',
      testMatch: ['**/tests/**/*.test.js', '!**/tests/cwds-components/**'],
    },
    {
      displayName: 'jsdom',
      testEnvironment: 'jsdom',
      testMatch: ['**/tests/cwds-components/**/*.test.tsx'],
      preset: 'ts-jest',
      transform: {
        '^.+\\.tsx?$': ['ts-jest', {
          tsconfig: {
            jsx: 'react',
            esModuleInterop: true,
            allowSyntheticDefaultImports: true,
          }
        }],
      },
      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': '<rootDir>/tests/__mocks__/styleMock.js',
      },
      setupFilesAfterEnv: ['<rootDir>/tests/cwds-components/setup.ts'],
    }
  ]
};
