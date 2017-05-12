const path = require('path');
const styleguidist = require('../scripts');

/* eslint-disable no-console */

const dir = path.resolve(__dirname, '../examples/basic/lib');

styleguidist({
	components: './components/**/[A-Z]*.js',
	webpackConfig: {
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					include: dir,
					loader: 'babel-loader',
				},
				{
					test: /\.css$/,
					include: dir,
					loader: 'style-loader!css-loader?modules',
				},
			],
		},
	},
}).server((err, config) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Listening at http://' + config.serverHost + ':' + config.serverPort);
	}
});
