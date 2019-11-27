class StyleguidistError extends Error {
	public extra: any;
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

export default StyleguidistError;
