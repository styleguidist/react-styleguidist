'use strict';

const webpack = require('webpack');
const makeWebpackConfig = require('./make-webpack-config');

module.exports = function build(config, callback) {
	return webpack([
		makeWebpackConfig(config, 'production', true), // build static "server" bundle
		makeWebpackConfig(config, 'production'), // and the clint-side bundle
	], (err, stats) => {
		// require('fs').writeFileSync('stats.json', JSON.stringify(stats.toJson()));
		callback(err, stats);
	});
};
