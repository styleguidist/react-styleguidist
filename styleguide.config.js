module.exports = {
	rootDir: './example',
	components: './**/*.js',
	getExampleFilename: function(componentpath) {
		return componentpath.replace(/\.js$/, '.examples.md');
	},
	updateWebpackConfig: function(config) {
		return config;
	}
};
