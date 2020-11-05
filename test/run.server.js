/* eslint-disable no-console */

const path = require('path');
const styleguidist = require('../lib/scripts');

const dir = path.resolve(__dirname, '../examples/basic/src');

styleguidist({
	components: path.resolve(dir, 'components/**/[A-Z]*.js'),
	webpackConfig: {
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					include: dir,
					loader: 'babel-loader',
				},
				{
					test: /\.css$/,
					include: dir,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								modules: true,
							},
						},
					],
				},
			],
		},
	},
	moduleAliases: {
		'rsg-example': dir,
	},
	logger: {
		info: console.log,
		warn: (message) => console.warn(`Warning: ${message}`),
	},
	serverPort: 8082,
	// Do not require delays in integration tests
	previewDelay: 0,
}).server((err, config) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Listening at http://' + config.serverHost + ':' + config.serverPort);
	}
});
