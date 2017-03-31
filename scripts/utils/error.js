'use strict';

class StyleguidistError extends Error {
	constructor(message, extra) {
		super(message);
		Error.captureStackTrace(this, this.constructor);
		Object.defineProperty(this, 'name', {
			value: this.constructor.name,
		});
		Object.defineProperty(this, 'extra', {
			value: extra,
		});
	}
}

module.exports = StyleguidistError;
