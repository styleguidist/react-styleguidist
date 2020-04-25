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
		'@babel/typescript',
		'@babel/react',
	],
	plugins: ['@babel/plugin-proposal-class-properties'],
	overrides: [
		{
			include: ['src/bin', 'src/loaders', 'src/scripts', 'src/share', 'src/typings'],
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
							node: '10',
						},
					},
				],
			],
		},
	],
	env: {
		test: {
			presets: [
				[
					'@babel/env',
					{
						loose: true,
						modules: 'commonjs',
						useBuiltIns: 'usage',
						corejs: 3,
						targets: {
							node: 'current',
						},
					},
				],
				'@babel/react',
				'@babel/flow',
			],
			plugins: ['@babel/plugin-proposal-class-properties'],
		},
	},
};
