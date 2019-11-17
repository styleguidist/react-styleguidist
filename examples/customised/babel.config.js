module.exports = {
	presets: [
		[
			'@babel/env',
			{
				debug: true,
				modules: false,
				useBuiltIns: 'usage',
			},
		],
		'@babel/react',
	],
	plugins: ['@babel/plugin-proposal-class-properties'],
};
