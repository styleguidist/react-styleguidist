module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				modules: false,
				useBuiltIns: 'usage',
				corejs: 3,
			},
		],
		'@babel/react',
	],
	plugins: ['@babel/plugin-proposal-class-properties'],
};
