const path = require('path');
const loaders = require('loaders');

module.exports = {
	title: 'React Style Guide Example',
	sections: [
		{
			name: 'Components',
			components: './src/components/**/[A-Z]*.js',
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
	require: [path.join(__dirname, 'src/styles.css')],
	webpackConfig: env => ({
		module: {
			loaders: loaders.all,
		},
		performance:
			env === 'development'
				? false
				: {
						maxAssetSize: 670000, // bytes
						maxEntrypointSize: 670000, // bytes
						hints: 'error',
					},
	}),
};
