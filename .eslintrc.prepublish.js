/**
 * @type {import('@types/eslint').ESLint.ConfigData}
 */
module.exports = {
	extends: './.eslintrc.js',

	overrides: [
		{
			files: ['*.ts'],
			plugins: ['eslint-plugin-n8n-nodes-base'],
			rules: {
				'n8n-nodes-base/node-filename-against-convention': 'off',
				// 'n8n-nodes-base/node-class-description-icon-not-svg': 'off',
				'n8n-nodes-base/node-class-description-inputs-wrong-regular-node': 'off',
				'n8n-nodes-base/node-class-description-outputs-wrong': 'off',
				// 'n8n-nodes-base/node-param-display-name-miscased': 'off',
				// 'n8n-nodes-base/node-param-options-type-unsorted-items': 'off',
				// 'n8n-nodes-base/node-execute-block-wrong-error-thrown': 'off',
				// 'n8n-nodes-base/community-package-json-name-still-default': 'off',
				// 'n8n-nodes-base/node-dirname-against-convention': 'off',
				// 'n8n-nodes-base/node-class-description-name-miscased': 'off'
			},
		},
	],
};
