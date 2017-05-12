'use strict';

const get = require('lodash/get');
const isFunction = require('lodash/isFunction');
const isRegExp = require('lodash/isRegExp');

/**
 * Check if given Webpack config has JSON loader.
 * Based on react-storybook.
 *
 * @param {object} webpackConfig
 * @return {boolean}
 */
module.exports = function hasJsonLoader(webpackConfig) {
	const testString = 'test.json';
	const loaders = get(webpackConfig, 'module.loaders', []);
	return loaders.reduce((value, loader) => {
		return (
			value ||
			[].concat(loader.test).some(matcher => {
				if (isRegExp(matcher)) {
					return matcher.test(testString);
				}
				if (isFunction(matcher)) {
					return matcher(testString);
				}
				return false;
			})
		);
	}, false);
};
