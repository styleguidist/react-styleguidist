/**
 * Calls a loader on some source, and returns a string representation
 * of a self-calling function which returns the loaded module.
 *
 * This string can be used in the return value of other loaders.
 *
 * @example
 *  // Inside some other loader
 *  const inlineModule = inlineLoader(this, './examples-loader.js', moduleSrc);
 *
 *  return `
 *    if (module.hot) {
 *      module.hot.accept([])
 *    }
 *
 *    module.exports.thing = inlineModule;
 *  `
 *
 * @param {Object} thisArg - The `this` value you want to use for the loader.
 * @param {String} loaderModulePath - Path to the loader module.
 * @param {String} source - The source to run through the loader.
 * @return {String}
 */
module.exports = function inlineLoader(thisArg, loaderModulePath, source) {
	const loader = require(loaderModulePath);
	return `
  (function() {
    let modules = {};
    ${loader.bind(thisArg)(source)}
    return module.exports;
  })()`;
};
