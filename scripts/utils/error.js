class StyleguidistError extends Error {
	constructor(message, extra, anchor) {
		super(message);
		Error.captureStackTrace(this, this.constructor);
		Object.defineProperty(this, 'name', {
			value: this.constructor.name,
		});
		Object.defineProperty(this, 'extra', {
			value: extra,
		});
		Object.defineProperty(this, 'anchor', {
			value: anchor,
		});
	}
}

module.exports = StyleguidistError;
