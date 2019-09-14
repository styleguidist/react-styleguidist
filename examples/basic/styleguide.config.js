const path = require('path');
const { version } = require('./package');

module.exports = {
	components: 'src/components/**/[A-Z]*.js',
	defaultExample: true,
	moduleAliases: {
		'rsg-example': path.resolve(__dirname, 'src'),
	},
	ribbon: {
		url: 'https://github.com/styleguidist/react-styleguidist',
	},
	version,
	themes: [
		{
			id: 'dark',
			styles: {
				color: {
					base: '#ccc',
					baseBackground: '#000',
					sidebarBackground: '#111',
					border: '#222',
				},
			},
		},
		{
			id: 'light',
			styles: {
				color: {
					base: '#333',
					baseBackground: '#fff',
					sidebarBackground: '#eee',
					border: '#ddd',
				},
			},
		},
	],
	defaultTheme: 'dark',
	styleguideComponents: {
		Wrapper: path.join(__dirname, 'styleguide/components/Wrapper'),
	},
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
					loader: 'style-loader!css-loader',
				},
			],
		},
	},
};
