/**
 * Return installed Webpack version.
 *
 * @return {number}
 */
module.exports = function getWebpackVersion() {
	try {
		return parseInt(require('webpack/package.json').version, 10);
	} catch (err) {
		return undefined;
	}
};
