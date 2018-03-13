const path = require('path');

module.exports = {
	components: 'src/components/**/[A-Z]*.js',
	defaultExample: true,
	propsPostProcessor(props, file) {
		// If there is a filename for the version, then load it in.
		if (props.doclets.version) {
			const versionFilePath = path.resolve(path.dirname(file), props.doclets.version);
			const version = require(versionFilePath).version;

			props.doclets.version = version;
			props.tags.version[0].description = version;
		}

		return props;
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
