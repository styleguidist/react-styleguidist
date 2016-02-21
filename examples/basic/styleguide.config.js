var path = require('path');

module.exports = {
	title: 'Style guide example',
	rootDir: './lib',
	components: function(config, glob) {
		return glob.sync(config.rootDir + '/components/**/*.js').filter(function(module) {
			return /\/[A-Z]\w*\.js$/.test(module);
		});
	},
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
