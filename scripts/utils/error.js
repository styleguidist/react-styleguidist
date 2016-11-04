'use strict';

class StyleguidistError extends Error {
	constructor(message) {
		super();
		Error.captureStackTrace(this, this.constructor);
		this.name = 'StyleguidistError';
		this.message = message;
	}
}

module.exports = StyleguidistError;
