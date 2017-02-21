'use strict';

const webpack = require('webpack');
const makeWebpackConfig = require('./make-webpack-config');

module.exports = function build(config, callback) {
	// Firstly, build static "server" bundle
	return webpack(makeWebpackConfig(config, 'production', true), (err, stats) => {
		if (err) {
			callback(err, stats);
		}

		// Then build client-side bundle
		webpack(makeWebpackConfig(config, 'production'), (err, stats) => {
			// require('fs').writeFileSync('stats.json', JSON.stringify(stats.toJson()));
			callback(err, stats);
		});
	});
};
