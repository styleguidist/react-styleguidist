/* eslint-disable no-var */

var webpack = require('webpack');
var makeWebpackConfig = require('./make-webpack-config');
var config = require('./utils/config');

module.exports = function build(callback) {
	webpack(makeWebpackConfig('production'), function(err, stats) {
		// require('fs').writeFileSync('stats.json', JSON.stringify(stats.toJson()));
		callback(err, stats, config);
	});
};
