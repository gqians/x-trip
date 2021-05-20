module.exports = {
	extends: [
		'standard',
		'plugin:react/recommended',
		'prettier',
		'prettier/react',
		'prettier/standard',
	],
	parser: 'babel-eslint',
	plugins: ['react', 'prettier', 'standard', 'jest'],
	env: {
		es6: true,
		browser: true,
		node: true,
		'jest/globals': true,
	},
	rules: {
		'no-debugger': 1,
		'jsx-a11y/href-no-hash': 'off',
		'jest/no-disabled-tests': 'warn',
		'jest/no-focused-tests': 'error',
		'jest/no-identical-title': 'error',
		'jest/valid-expect': 'error',
		'prettier/prettier': 'error',
	},
	settings: {
		'import/resolver': {
			node: {
				paths: ['./src/client', './src/server', 'src', '.'],
			},
		},
		react: {
			version: 'detect',
		},
	},
};
