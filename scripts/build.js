'use strict';

const webpack = require('webpack');
const makeWebpackConfig = require('./make-webpack-config');

module.exports = function build(config, callback) {
	return webpack(makeWebpackConfig(config, 'production'), (err, stats) => {
		// require('fs').writeFileSync('stats.json', JSON.stringify(stats.toJson()));
		callback(err, stats);
	});
};
