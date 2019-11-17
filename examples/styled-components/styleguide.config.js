const path = require('path');
const { version } = require('./package');

module.exports = {
	components: 'src/components/**/index.ts',
	styleguideComponents: {
		Wrapper: path.join(__dirname, 'src/StyleGuideWrapper'),
	},
	defaultExample: true,
	moduleAliases: {
		'rsg-example': path.resolve(__dirname, 'src'),
	},
	ribbon: {
		url: 'https://github.com/styleguidist/react-styleguidist',
	},
	version,
	webpackConfig: {
		module: {
			rules: [
				{
					test: /\.(js|ts)x?$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
			],
			noParse: /\.(css|scss)/,
		},
		resolve: {
			extensions: ['.js', 'jsx', '.ts', '.tsx', '.json'],
		},
	},
};
