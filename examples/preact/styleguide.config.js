const path = require('path');
const loaders = require('loaders');
const preactCompatWrapper = path.join(__dirname, '/src/preact-compat');
module.exports = {
	components: 'src/components/**/[A-Z]*.js',
	defaultExample: true,
	webpackConfig: {
		resolve: {
			alias: {
				react: preactCompatWrapper,
				'react-dom': preactCompatWrapper,
			},
		},
		module: {
			loaders: loaders.all,
		},
	},
};
