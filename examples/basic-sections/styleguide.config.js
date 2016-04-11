var path = require('path');
var glob = require('glob');

module.exports = {
	title: 'React Style Guide Example',
	sections: [
		{
			name: 'Example Section',
			components: function() {
				return glob.sync(path.resolve(__dirname, 'lib/components/**/*.js'))
			 .filter(function(module) {
					return /\/[A-Z]\w*\.js$/.test(module);
				})
			}
		}
	],
	updateWebpackConfig: function(webpackConfig, env) {
		webpackConfig.module.loaders.push(
			{
				test: /\.jsx?$/,
				include: __dirname,
				loader: 'babel'
			},
			{
				test: /\.css$/,
				include: __dirname,
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
