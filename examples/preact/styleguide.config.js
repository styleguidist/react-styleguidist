const loaders = require('loaders');
module.exports = {
	components: 'src/components/**/[A-Z]*.js',
	defaultExample: true,
	webpackConfig: {
		resolve: {
			alias: {
				react: 'preact-compat',
				'react-dom': 'preact-compat',
			},
		},
		module: {
			loaders: loaders.all,
		},
	},
};
