const chalk = require('chalk');

module.exports = {
	components: 'src/components/**/[A-Z]*.js',
	defaultExample: true,
	printServerInstructions(config) {
		// eslint-disable-next-line no-console
		console.log(`  ${chalk.bold('Local:')}            ${config.serverHost}`);
	},
	webpackConfig: {
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader',
				},
			],
		},
	},
};
