const loaders = require('loaders');
module.exports = {
	components: 'src/components/**/[A-Z]*.js',
	defaultExample: true,
	webpackConfig: {
		module: {
			loaders: loaders.all,
		},
	},
};
