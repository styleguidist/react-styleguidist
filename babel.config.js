module.exports = {
	presets: [
		[
			'@babel/env',
			{
				modules: false,
				useBuiltIns: 'usage',
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
