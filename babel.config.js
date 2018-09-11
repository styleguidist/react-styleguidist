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
			include: ['src/bin', 'src/loaders', 'src/scripts', 'src/share'],
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
