'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const isCreateReactApp = require('./isCreateReactApp');

const CREATE_REACT_APP_WEBPACK_CONFIG = 'react-scripts/config/webpack.config.dev';
const USER_WEBPACK_CONFIG_NAMES = [
	'webpack.config.dev.js',
	'webpack.config.js',
];
const USER_WEBPACK_CONFIG_MASK = '!(node_modules)*/**/webpack.config{.dev,}.js';

/**
 * Find user’s Webpack config and return its path.
 * Fixed location for create-react-app or search for the first webpack.config.dev.js or webpack.config.js.
 * Returns false if config not found.
 *
 * @return {string|boolean}
 */
module.exports = function findUserWebpackConfig() {
	// create-react-app
	if (isCreateReactApp()) {
		return CREATE_REACT_APP_WEBPACK_CONFIG;
	}

	// Quick check in the root folder
	for (const configFile of USER_WEBPACK_CONFIG_NAMES) {
		if (fs.existsSync(configFile)) {
			return path.resolve(configFile);
		}
	}

	// Slower glob for ancestor folders
	const foundConfig = glob.sync(USER_WEBPACK_CONFIG_MASK);
	if (foundConfig.length) {
		return path.resolve(foundConfig[0]);
	}

	return false;
};
