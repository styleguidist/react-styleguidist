const escape = require('escape-string-regexp');
const isObject = require('is-plain-obj');
const path = require('path');

const MASK = '~';
const DIRNAME = getRootDir();

/**
 * Recursively replace absolute paths in object keys and values or in array values with a “~”.
 *
 * @param {object} obj
 * @param {object} [options]
 * @param {string} [options.root]
 * @param {string} [options.mask]
 * @return {object}
 */
function deabsDeep(obj, options) {
	options = options || {};
	const root = options.root || DIRNAME;
	const mask = options.mask || MASK;

	const regExp = new RegExp(escape(root), 'g');
	const deabs = (s) => (typeof s === 'string' ? s.replace(regExp, mask) : s);

	if (Array.isArray(obj)) {
		return obj.map(deabs);
	}

	return mapObj(obj, (key, value) => [deabs(key), deabs(value)]);
}

function getRootDir(dir) {
	dir = dir || __dirname;
	const m = dir.match(/[\\/]node_modules[\\/]/);
	return m ? dir.substring(0, m.index) : path.resolve(__dirname, '..');
}

/* istanbul ignore next */
function mapObj(obj, fn, seen) {
	seen = seen || new WeakMap();
	if (seen.has(obj)) {
		return seen.get(obj);
	}

	const target = {};

	seen.set(obj, target);

	for (const key of Object.keys(obj)) {
		const val = obj[key];
		const res = fn(key, val, obj);
		let newVal = res[1];

		if (isObject(newVal)) {
			if (Array.isArray(newVal)) {
				newVal = newVal.map((x) => (isObject(x) ? mapObj(x, fn, seen) : x));
			} else {
				newVal = mapObj(newVal, fn, seen);
			}
		}

		target[res[0]] = newVal;
	}

	// The $$typeof property is a React marker that's used for serialization.
	// deabsdeep doesn't know about React Elements but since it's registered globally,
	// it should keep this property on the object.
	if (obj.$$typeof) {
		target.$$typeof = obj.$$typeof;
	}

	return target;
}

// Borrowed from https://github.com/eyolas/jest-serializer-supertest
const KEY = '__JEST_SERIALIZER_DEABSDEEP__';

module.exports = {
	test(val) {
		return (Array.isArray(val) || isObject(val)) && !Object.prototype.hasOwnProperty.call(val, KEY);
	},
	print(val, serialize) {
		const newVal = deabsDeep(val);

		// To skip maximum call stack size exceeded
		Object.defineProperty(newVal, KEY, {
			enumerable: false,
		});

		return serialize(newVal);
	},
};
