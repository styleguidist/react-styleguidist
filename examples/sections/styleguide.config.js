const path = require('path');

module.exports = {
	title: 'React Style Guide Example',
	pagePerSection: true,
	sections: [
		{
			name: 'Documentation',
			content: 'docs/Documentation.md',
			sections: [
				{
					name: 'Files',
					content: 'docs/Files.md',
					components: () => ['./src/components/WrappedButton/WrappedButton.js'],
					sections: [
						{
							name: 'First File',
							content: 'docs/One.md',
							description: 'This is the first section description',
							components: () => ['./src/components/Label/Label.js'],
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
			content: 'docs/Components.md',
			sections: [
				{
					name: 'Buttons',
					components: () => ['./src/components/Button/Button.js'],
					exampleModes: 'expand', // 'hide' | 'collapse' | 'expand'
					usageModes: 'hide', // 'hide' | 'collapse' | 'expand'
				},
				{
					name: 'Fields',
					components: () => ['./src/components/Placeholder/Placeholder.js'],
					exampleModes: 'expand', // 'hide' | 'collapse' | 'expand'
					usageModes: 'expand', // 'hide' | 'collapse' | 'expand'
				},
				{
					name: 'Others',
					components: () => ['./src/components/RandomButton/RandomButton.js'],
					exampleModes: 'collapse', // 'hide' | 'collapse' | 'expand'
					usageModes: 'collapse', // 'hide' | 'collapse' | 'expand'
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
