var path = require('path');
var glob = require('glob');

module.exports = {
	title: 'React Style Guide Example',
	components: function() {
		return glob.sync(path.resolve(__dirname, 'lib/components/**/*.js')).filter(function(module) {
			return /\/[A-Z]\w*\.js$/.test(module);
		});
	},
	updateWebpackConfig: function(webpackConfig, env) {
		var dir = path.resolve(__dirname, 'lib');
		webpackConfig.module.loaders.push(
			{
				test: /\.jsx?$/,
				include: dir,
				loader: 'babel'
			},
			{
				test: /\.css$/,
				include: dir,
				loader: 'style!css?modules&importLoaders=1'
			},
			{
				test: /\.json$/,
				include: path.dirname(require.resolve('dog-names/package.json')),
				loader: 'json'
			}
		);
		return webpackConfig;
	}
};
