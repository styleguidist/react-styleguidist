module.exports = {
	title: 'Style guide example',
	rootDir: '.',
	components: function(config, glob) {
		return glob.sync(config.rootDir + '/components/**/*.js').filter(function(module) {
			return /\/[A-Z][a-z]*\.js$/.test(module);
		});
	},
	updateWebpackConfig: function(webpackConfig, env) {
		return webpackConfig;
	}
};
