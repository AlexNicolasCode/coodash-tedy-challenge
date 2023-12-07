module.exports = {
    roots: ['<rootDir>/test'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    coverageDirectory: 'coverage',
    transform: {
      '.+\\.ts$': 'ts-jest'
    },
    moduleNameMapper: {
      'test/(.*)': '<rootDir>/test/$1',
      '@/(.*)': '<rootDir>/src/$1'
    }
}
    