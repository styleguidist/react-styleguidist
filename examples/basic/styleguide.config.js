const loaders = require('loaders');
module.exports = {
	components: 'lib/components/**/[A-Z]*.js',
	defaultExample: true,
	webpackConfigFile: false,
	webpackConfig: {
		module: {
			loaders: loaders.all,
		},
		performance: {
			maxAssetSize: 650000,  // bytes
			maxEntrypointSize: 650000,  // bytes
			hints: 'error',
		},
	},
};
