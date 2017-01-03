const loaders = require('loaders');

module.exports = {
	title: 'Style guide example',
	components: './lib/components/**/[A-Z]*.js',
	webpackConfig: {
		module: {
			loaders: [
				loaders.babel,
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader?modules',
				},
			],
		},
	},
	configureServer(app) {
		app.get('/custom', (req, res) => {
			res.status(200).send({ response: 'Server invoked' });
		});
	},
};
