module.exports = {
	...require('../../babel.config'),
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
						targets: {
							node: '6.4',
						},
					},
				],
			],
		},
	],
};
