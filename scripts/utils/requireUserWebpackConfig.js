'use strict';

const isCreateReactApp = require('./isCreateReactApp');

/**
 * Find and require user‘s Webpack config.
 *
 * @param {string|bool} webpackConfigFile
 * @return {object}
 */
module.exports = function requireUserWebpackConfig(webpackConfigFile) {
	if (webpackConfigFile === true) {
		if (isCreateReactApp()) {
			return require('react-scripts/config/webpack.config.dev');
		}

		return {};
	}

	return require(webpackConfigFile);
};
