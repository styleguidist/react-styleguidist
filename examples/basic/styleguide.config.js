const loaders = require('loaders');
module.exports = {
	components: 'lib/components/**/[A-Z]*.js',
	defaultExample: true,
	webpackConfig: {
		module: {
			loaders: loaders.all,
		},
	},
};
