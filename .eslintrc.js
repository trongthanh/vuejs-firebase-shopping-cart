/**
 * Eslint config
 */
module.exports = {
	extends: [
		'vue',
		'nau',
	],

	plugins: [
		'import',
		'vue',
	],

	rules: {
		'import/newline-after-import': 'off',
		'import/prefer-default-export': 'off',
		'max-len': 'off',
		'no-param-reassign': 'off',
		'no-shadow': 'off',
		'prefer-const': 'off',
		'quote-props': 'off',
		'spaced-comment': 'off',
	}
}
