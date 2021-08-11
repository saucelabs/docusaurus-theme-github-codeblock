module.exports = {
    testEnvironment: 'node',
    collectCoverage: true,
    testMatch: ['<rootDir>/tests/**/*.test.ts'],
    transform: {
        '^.+\\.(ts|js|tsx)$': 'ts-jest'
    },
    coverageThreshold: {
		global: {
			branches: 20,
			functions: 42,
			lines: 47,
			statements: 47
		}
    }
};
