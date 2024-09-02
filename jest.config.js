module.exports = async () => ({
  verbose: true,
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  transform: {
    "\\.[jt]sx?$": "babel-jest"
  },
  setupFilesAfterEnv: ["<rootDir>/src/setup-tests.js"],
  moduleNameMapper: {
    '\\.scss$': '<rootDir>/__mocks__/style.mock.js',
     '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/file.mock.js',
  }
})