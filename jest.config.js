module.exports = {
    testEnvironment: 'node',
    collectCoverage: true,
    testMatch: ['<rootDir>/tests/**/*.test.ts'],
    transform: {
        '^.+\\.(ts|js|tsx)$': 'ts-jest'
    },
    coverageThreshold: {
		global: {
			branches: 17,
			functions: 28,
			lines: 33,
			statements: 33
		}
    }
};
