/**
 * Find user’s Webpack config and return its path.
 * Fixed location for Create React App or webpack.config.js in the root directory.
 * Returns false if config not found.
 *
 * @param {Function} resolve
 * @return {string|boolean}
 */
export default function findUserWebpackConfig(resolve?: (input: string) => string): string | false;
