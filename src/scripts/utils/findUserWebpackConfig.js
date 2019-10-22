const fs = require('fs');
const path = require('path');

// react-scripts <= 2.1.1
const CREATE_REACT_APP_WEBPACK_CONFIG_OLD = 'react-scripts/config/webpack.config.dev';
// react-scripts > 2.1.1
const CREATE_REACT_APP_WEBPACK_CONFIG = 'react-scripts/config/webpack.config';
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
		// Create React App <= 2.1.1
		return resolve(CREATE_REACT_APP_WEBPACK_CONFIG_OLD);
	} catch (err) {
		try {
			// Create React App > 2.1.1
			return resolve(CREATE_REACT_APP_WEBPACK_CONFIG);
		} catch (innerErr) {
			// Check in the root folder
			// FIXME: This looks like a bug in ESLint
			// eslint-disable-next-line no-unused-vars
			for (const configFile of USER_WEBPACK_CONFIG_NAMES) {
				const absoluteConfigFile = absolutize(configFile);
				if (fs.existsSync(absoluteConfigFile)) {
					return absoluteConfigFile;
				}
			}
		}
	}

	return false;
};
