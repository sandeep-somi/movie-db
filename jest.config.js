module.exports = async () => ({
  verbose: true,
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  transform: {
    "\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  setupFilesAfterEnv: ["<rootDir>/src/setup-tests.ts"],
  moduleNameMapper: {
    '\\.scss$': '<rootDir>/src/__mocks__/style.mock.ts',
     '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/file.mock.ts',
  }
})