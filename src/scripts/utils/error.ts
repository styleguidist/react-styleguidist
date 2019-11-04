export default class StyleguidistError extends Error {
	public constructor(message: string, extra?: any) {
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
