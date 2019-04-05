const webpackConfig = require('./webpack.config');

const babel = webpackConfig.module.rules.filter(rule => rule.loader === 'babel-loader')[0];
babel.exclude = /node_modules\/(?!(ansi-styles|strip-ansi|ansi-regex|react-dev-utils|chalk|regexpu-core|unicode-match-property-ecmascript|unicode-match-property-value-ecmascript|acorn-jsx)\/).*/;

module.exports = {
	title: 'React Style Guide Example',
	components: 'src/components/**/*.js',
	webpackConfig,
	require: ['core-js'],
};
