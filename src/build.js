var webpack = require('webpack');
var makeWebpackConfig = require('./make-webpack-config');
var config = require('./utils/config');

console.log('Building style guide...');

webpack(makeWebpackConfig('production'), function(err, stats) {
	console.log('Done.');
});
