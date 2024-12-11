module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^axios$': '<rootDir>/__mocks__/axios.js',
        '^react-router-dom$': '<rootDir>/__mocks__/react-router-dom.js',
    },
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    testEnvironment: 'jsdom',
};
