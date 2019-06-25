module.exports = {
	...require('../../babel.config'),
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
};
