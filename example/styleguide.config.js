module.exports = {
	title: 'Style guide example',
	rootDir: './lib',
	components: function(config, glob) {
		return glob.sync(config.rootDir + '/components/**/*.js').filter(function(module) {
			return /\/[A-Z]\w*\.js$/.test(module);
		});
	},
	updateWebpackConfig: function(webpackConfig, env) {
		webpackConfig.module.loaders.push({
			test: /\.jsx?$/,
			include: __dirname,
			loader: 'babel'
		});
		webpackConfig.module.loaders.push({
			test: /\.css$/,
			include: __dirname,
			loader: 'style!css?modules&importLoaders=1'
		});
		return webpackConfig;
	}
};
