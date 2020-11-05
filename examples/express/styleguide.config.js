module.exports = {
	title: 'Style guide example',
	components: './src/components/**/[A-Z]*.js',
	webpackConfig: {
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{
					test: /\.css$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								modules: true,
							},
						},
					],
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
