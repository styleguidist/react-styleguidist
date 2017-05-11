'use strict';

// WARNING: This function’s source is returned by a loader without transpilation.
// Do not use any unsupported by IE11+ features.

/**
 * Eval example code in a custom context:
 * - `require()` that allows you to require modules from Markdown examples (won’t work dinamically becasue we need
 *   to know all required modules in advance to be able to bundle them with the code).
 * - `state` variable, `setState` and `__setInitialState` functions that will be binded to a React component
 *   that manages example’s state on the frontend.
 *
 * Also prepends a given `code` with a `header` (maps required context modules to local variables).
 *
 * @param {string} header
 * @param {Function} require
 * @param {string} code
 * @return {Function}
 */
module.exports = function evalInContext(header, require, code) {
	var func = new Function('require', 'state', 'setState', '__setInitialState', header + code); // eslint-disable-line no-new-func

	// Bind the `require` function, other context arguments will be passed from the frontend
	return func.bind(null, require);
};
