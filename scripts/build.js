/* eslint-disable no-var */

var webpack = require('webpack');

var config = require('./../src/utils/config');
config.initialize(); // we need to initialize config before requiring anything else from the project

var makeWebpackConfig = require('./make-webpack-config');

module.exports = function build(callback) {
	webpack(makeWebpackConfig('production'), function(err, stats) {
		// require('fs').writeFileSync('stats.json', JSON.stringify(stats.toJson()));
		callback(err, stats, config);
	});
};
