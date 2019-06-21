module.exports = {
	presets: [
		[
			'@babel/env',
			{
				loose: true,
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
			include: [
				'packages/*/src/bin',
				'packages/*/src/loaders',
				'packages/*/src/scripts',
				'packages/*/src/share',
			],
			exclude: ['packages/*/src/loaders/utils/client'],
			presets: [
				[
					'@babel/env',
					{
						loose: true,
						modules: 'commonjs',
						useBuiltIns: 'usage',
						targets: {
							node: '6.4',
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
