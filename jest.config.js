module.exports = async () => ({
  verbose: true,
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  transform: {
    "\\.[jt]sx?$": "babel-jest"
  },
  setupFilesAfterEnv: ["<rootDir>/src/setup-tests.js"],
  moduleNameMapper: {
    '\\.scss$': '<rootDir>/src/__mocks__/style.mock.js',
     '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/file.mock.js',
    '^intersection-observer$': '<rootDir>/src/__mocks__/intersection-observer.mock.js'
  }
})