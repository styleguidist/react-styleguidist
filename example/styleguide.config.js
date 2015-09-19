module.exports = {
	title: 'Style guide example',
	rootDir: '.',
	components: './components/**/*.js',
	getExampleFilename: function(componentpath) {
		return componentpath.replace(/\.js$/, '.examples.md');
	},
	updateWebpackConfig: function(config, env) {
		return config;
	}
};
