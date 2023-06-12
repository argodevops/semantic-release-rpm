module.exports = {
    testMatch: ['**/*.test.js'],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.js',
        '!**node_modules/**',
        '!src/**/**.test.js'
    ],
    coverageDirectory: 'coverage',
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100
        }
    },
    transform: {
        '\\.[jt]sx?$': 'babel-jest'
    }
};
