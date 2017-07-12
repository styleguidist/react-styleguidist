'use strict';

const isPlainObject = require('lodash/isPlainObject');

/**
 * Makes all keys in an object lower case.
 *
 * @param {object} object
 * @returns {object}
 */
module.exports = function keysToLowerCaseDeep(object) {
	return Object.keys(object).reduce((newObject, key) => {
		newObject[key.toLowerCase()] = isPlainObject(object[key])
			? keysToLowerCaseDeep(object[key])
			: object[key];
		return newObject;
	}, {});
};
