"use strict";

exports.__esModule = true;
exports.default = getWebpackVersion;

/**
 * Return installed Webpack version.
 *
 * @return {number}
 */
function getWebpackVersion() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return parseInt(require('webpack/package.json').version, 10);
  } catch (err) {
    return undefined;
  }
}