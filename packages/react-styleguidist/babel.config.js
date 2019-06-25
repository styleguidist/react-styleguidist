const mainConfig = require('../../babel.config');

mainConfig.overrides = [
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
						node: '6.4',
					},
				},
			],
		],
	},
];

module.exports = mainConfig;
