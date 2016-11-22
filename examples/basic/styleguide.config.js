const loaders = require('loaders');
module.exports = {
	title: 'React Style Guide Example',
	components: 'lib/components/**/[A-Z]*.js',
	defaultExample: true,
	webpackConfig: {
		module: {
			loaders: loaders.all,
		},
	},
};
