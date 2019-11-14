module.exports = {
	plugins: [
		[
			'@semantic-release/commit-analyzer',
			{
				preset: 'eslint',
			},
		],
		[
			'@semantic-release/release-notes-generator',
			{
				preset: 'eslint',
			},
		],
		'@semantic-release/npm',
		'@semantic-release/github',
	],
};
