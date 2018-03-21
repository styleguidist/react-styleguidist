const path = require('path');

module.exports = {
	title: 'React Style Guide Example',
	sections: [
		{
			name: 'Documentation',
			sections: [
				{
					name: 'Files',
					sections: [
						{
							name: 'First File',
							content: 'docs/One.md',
							description: 'This is the first section description',
						},
						{
							name: 'Second File',
							content: 'docs/Two.md',
						},
					],
				},
			],
		},
		{
			name: 'Components',
			sections: [
				{
					name: 'Buttons',
					components: () => [
						'./src/components/Button/Button.js',
						'./src/components/RandomButton/RandomButton.js',
						'./src/components/WrappedButton/WrappedButton.js',
					],
				},
				{
					name: 'Fields',
					components: () => [
						'./src/components/Label/Label.js',
						'./src/components/Placeholder/Placeholder.js',
					],
				},
			],
		},
	],
	require: [path.join(__dirname, 'src/styles.css')],
	webpackConfig: env => ({
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader',
				},
			],
		},
		performance:
			env === 'development'
				? false
				: {
						maxAssetSize: 685000, // bytes
						maxEntrypointSize: 685000, // bytes
						hints: 'error',
				  },
	}),
};
