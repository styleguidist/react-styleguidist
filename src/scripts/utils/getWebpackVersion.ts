/**
 * Return installed Webpack version.
 *
 * @return {number}
 */
export default function getWebpackVersion() {
	try {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		return parseInt(require('webpack/package.json').version, 10);
	} catch (err) {
		return undefined;
	}
}
