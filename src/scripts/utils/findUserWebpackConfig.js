const fs = require('fs');
const path = require('path');

const CREATE_REACT_APP_WEBPACK_CONFIG = 'react-scripts/config/webpack.config.dev';
const USER_WEBPACK_CONFIG_NAMES = ['webpack.config.js', 'webpackfile.js'];

const absolutize = filePath => path.resolve(process.cwd(), filePath);

/**
 * Find user’s Webpack config and return its path.
 * Fixed location for Create React App or webpack.config.js in the root directory.
 * Returns false if config not found.
 *
 * @param {Function} resolve
 * @return {string|boolean}
 */
module.exports = function findUserWebpackConfig(resolve) {
	resolve = resolve || require.resolve;
	try {
		// Create React App
		return resolve(CREATE_REACT_APP_WEBPACK_CONFIG);
	} catch (err) {
		// Check in the root folder
		for (const configFile of USER_WEBPACK_CONFIG_NAMES) {
			const absoluteConfigFile = absolutize(configFile);
			if (fs.existsSync(absoluteConfigFile)) {
				return absoluteConfigFile;
			}
		}
	}

	return false;
};
