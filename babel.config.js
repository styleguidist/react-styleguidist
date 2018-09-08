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
	overrides: [
		{
			include: ['packages/*/src/bin', 'packages/*/src/loaders', 'packages/*/src/scripts'],
			presets: [
				[
					'@babel/env',
					{
						modules: 'commonjs',
						useBuiltIns: 'usage',
						targets: {
							node: '6',
						},
					},
				],
			],
		},
	],
	env: {
		test: {
			presets: ['@babel/env', '@babel/react', '@babel/flow'],
			plugins: ['@babel/plugin-proposal-class-properties'],
		},
	},
};
