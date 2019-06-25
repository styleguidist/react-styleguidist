module.exports = {
	presets: [
		[
			'@babel/env',
			{
				loose: true,
				modules: false,
				useBuiltIns: 'usage',
				corejs: 3,
			},
		],
		'@babel/react',
		'@babel/flow',
	],
	plugins: ['@babel/plugin-proposal-class-properties'],
	env: {
		test: {
			presets: ['@babel/env', '@babel/react', '@babel/flow'],
			plugins: ['@babel/plugin-proposal-class-properties'],
		},
	},
};
