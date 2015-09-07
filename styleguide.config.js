module.exports = {
	components: './example/**/*.js',
	getExampleFilename: function(componentpath) {
		return componentpath.replace(/\.js$/, '.examples.md');
	}
};
