module.exports = {
	presets: [
		[
			'@babel/env',
			{
				debug: true,
				modules: false,
			},
		],
		'@babel/react',
	],
	plugins: ['@babel/plugin-proposal-class-properties'],
};
