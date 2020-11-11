module.exports = {
    testEnvironment: 'node',
    collectCoverage: true,
    testMatch: ['<rootDir>/tests/**/*.test.ts'],
    transform: {
        '^.+\\.(ts|js|tsx)$': 'ts-jest'
    },
    coverageThreshold: {
		global: {
			branches: 66,
			functions: 100,
			lines: 100,
			statements: 100
		}
    }
};
