'use strict';

class StyleguidistError extends Error {
	constructor(...args) {
		super(...args);
		Error.captureStackTrace(this, this.constructor);
		Object.defineProperty(this, 'name', {
			value: this.constructor.name,
		});
	}
}

module.exports = StyleguidistError;
