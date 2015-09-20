var webpack = require('webpack');
var makeWebpackConfig = require('./make-webpack-config');
var config = require('./utils/config');

module.exports = function build(callback) {
	webpack(makeWebpackConfig('production'), function(err, stats) {
		callback(err, stats, config);
	});
};
