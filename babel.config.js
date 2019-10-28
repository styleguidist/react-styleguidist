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
	overrides: [
		{
			include: ['src/bin', 'src/loaders', 'src/scripts', 'src/share'],
			exclude: ['src/loaders/utils/client'],
			presets: [
				[
					'@babel/env',
					{
						loose: true,
						modules: 'commonjs',
						useBuiltIns: 'usage',
						corejs: 3,
						targets: {
							node: '8.6',
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
