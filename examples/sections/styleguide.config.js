const loaders = require('loaders');
module.exports = {
	title: 'React Style Guide Example',
	sections: [
		{
			name: 'Components',
			components: './lib/components/**/[A-Z]*.js',
		},
		{
			name: 'Documentation',
			sections: [
				{
					name: 'First File',
					content: 'docs/One.md',
				},
				{
					name: 'Second File',
					content: 'docs/Two.md',
				},
			],
		},
	],
	webpackConfigFile: false,
	webpackConfig: env => ({
		module: {
			loaders: loaders.all,
		},
		performance: env === 'development' ? false : {
			maxAssetSize: 650000,  // bytes
			maxEntrypointSize: 650000,  // bytes
			hints: 'error',
		},
	}),
};
