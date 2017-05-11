import path from 'path';
import sanitizeConfig from '../sanitizeConfig';

it('should return non-empty required field as is', () => {
	const result = sanitizeConfig(
		{
			food: 'pizza',
		},
		{
			food: {
				required: true,
			},
		}
	);
	expect(result).toBeTruthy();
	expect(result.food).toBe('pizza');
});

it('should return default value for empty non-required field', () => {
	const result = sanitizeConfig(
		{},
		{
			food: {
				default: 'pizza',
			},
		}
	);
	expect(result.food).toBe('pizza');
});

it('should return actual value for non-empty field with default value', () => {
	const result = sanitizeConfig(
		{
			food: 'burger',
		},
		{
			food: {
				default: 'pizza',
			},
		}
	);
	expect(result.food).toBe('burger');
});

it('should accept required as a function', () => {
	const result = sanitizeConfig(
		{
			food: 'pizza',
		},
		{
			food: {
				required: () => true,
			},
		}
	);
	expect(result.food).toBe('pizza');
});

it('should throw if required field is undefined', () => {
	const fn = () =>
		sanitizeConfig(
			{},
			{
				food: {
					required: true,
				},
			}
		);
	expect(fn).toThrowError('config option is required');
});

it('should throw with custom message returned by required function', () => {
	const fn = () =>
		sanitizeConfig(
			{},
			{
				food: {
					required: () => 'Not good',
				},
			}
		);
	expect(fn).toThrowError('Not good');
});

it('should throw when type in schema is incorrect', () => {
	const fn = () =>
		sanitizeConfig(
			{
				food: 42,
			},
			{
				food: {
					type: 'pizza',
				},
			}
		);
	expect(fn).toThrowError('Wrong type');
});

it('should check type for number', () => {
	const result = sanitizeConfig(
		{
			food: 42,
		},
		{
			food: {
				type: 'number',
			},
		}
	);
	expect(result.food).toBe(42);
});

it('should throw when field is not a number', () => {
	const fn = () =>
		sanitizeConfig(
			{
				food: 'pizza',
			},
			{
				food: {
					type: 'number',
				},
			}
		);
	expect(fn).toThrowError('config option should be');
});

it('should check type for string', () => {
	const result = sanitizeConfig(
		{
			food: 'pizza',
		},
		{
			food: {
				type: 'string',
			},
		}
	);
	expect(result.food).toBe('pizza');
});

it('should throw when field is not a string', () => {
	const fn = () =>
		sanitizeConfig(
			{
				food: 42,
			},
			{
				food: {
					type: 'string',
				},
			}
		);
	expect(fn).toThrowError('config option should be');
});

it('should check type for boolean', () => {
	const result = sanitizeConfig(
		{
			food: true,
		},
		{
			food: {
				type: 'boolean',
			},
		}
	);
	expect(result.food).toBe(true);
});

it('should throw when field is not a boolean', () => {
	const fn = () =>
		sanitizeConfig(
			{
				food: 42,
			},
			{
				food: {
					type: 'boolean',
				},
			}
		);
	expect(fn).toThrowError('config option should be');
});

it('should check type for array', () => {
	const result = sanitizeConfig(
		{
			food: [1, 2],
		},
		{
			food: {
				type: 'array',
			},
		}
	);
	expect(result.food).toEqual([1, 2]);
});

it('should throw when field is not an array', () => {
	const fn = () =>
		sanitizeConfig(
			{
				food: 42,
			},
			{
				food: {
					type: 'array',
				},
			}
		);
	expect(fn).toThrowError('config option should be');
});

it('should check type for function', () => {
	const result = sanitizeConfig(
		{
			food: () => true,
		},
		{
			food: {
				type: 'function',
			},
		}
	);
	expect(typeof result.food).toBe('function');
});

it('should throw when field is not a function', () => {
	const fn = () =>
		sanitizeConfig(
			{
				food: 42,
			},
			{
				food: {
					type: 'function',
				},
			}
		);
	expect(fn).toThrowError('config option should be');
});

it('should check type for object', () => {
	const result = sanitizeConfig(
		{
			food: { a: 42 },
		},
		{
			food: {
				type: 'object',
			},
		}
	);
	expect(result.food).toEqual({ a: 42 });
});

it('should throw when field is not an object', () => {
	const fn = () =>
		sanitizeConfig(
			{
				food: 42,
			},
			{
				food: {
					type: 'object',
				},
			}
		);
	expect(fn).toThrowError('config option should be');
});

it('should check type for file path', () => {
	const result = sanitizeConfig(
		{
			food: __filename,
		},
		{
			food: {
				type: 'file path',
			},
		},
		__dirname
	);
	expect(result.food).toEqual(__filename);
});

it('should check type for relative file path and absolutize it', () => {
	const result = sanitizeConfig(
		{
			food: path.basename(__filename),
		},
		{
			food: {
				type: 'file path',
			},
		},
		__dirname
	);
	expect(result.food).toEqual(__filename);
});

it('should throw when file does not exist', () => {
	const fn = () =>
		sanitizeConfig(
			{
				food: 'pizza.js',
			},
			{
				food: {
					type: 'existing file path',
				},
			},
			__dirname
		);
	expect(fn).toThrowError('does not exist');
});

it('should check type for directory path', () => {
	const result = sanitizeConfig(
		{
			food: __dirname,
		},
		{
			food: {
				type: 'directory path',
			},
		},
		__dirname
	);
	expect(result.food).toEqual(__dirname);
});

it('should check type for relative directory path and absolutize it', () => {
	const result = sanitizeConfig(
		{
			food: 'data',
		},
		{
			food: {
				type: 'file path',
			},
		},
		__dirname
	);
	expect(result.food).toEqual(path.join(__dirname, 'data'));
});

it('should throw with correct type name', () => {
	const fn = () =>
		sanitizeConfig(
			{
				food: null,
			},
			{
				food: {
					type: 'object',
				},
			}
		);
	expect(fn).toThrowError('config option should be object, received null');
});

it('should pass value to a custom process function', () => {
	const result = sanitizeConfig(
		{
			food: true,
		},
		{
			food: {
				type: ['boolean', 'string'],
				process: val => (val === true ? 'pizza' : val),
			},
		}
	);
	expect(result.food).toEqual('pizza');
});

it('should not throw if process function returns value for undefined required field', () => {
	const fn = () =>
		sanitizeConfig(
			{},
			{
				food: {
					required: true,
					process: () => 'pizza',
				},
			}
		);
	expect(fn).not.toThrowError('config option is required');
});

it('should throw when directory does not exist', () => {
	const fn = () =>
		sanitizeConfig(
			{
				food: 'pizza.js',
			},
			{
				food: {
					type: 'existing directory path',
				},
			},
			__dirname
		);
	expect(fn).toThrowError('does not exist');
});

it('should throw for unknown options', () => {
	const fn = () =>
		sanitizeConfig(
			{
				book: 'hobbit',
			},
			{
				drink: {},
				food: {},
			}
		);
	expect(fn).toThrowError('Unknown config option');
});

it('should throw for unknown options with suggestion', () => {
	const fn = () =>
		sanitizeConfig(
			{
				dring: 'pizza',
			},
			{
				drink: {},
				food: {},
			}
		);
	expect(fn).toThrowError('Did you mean');
});

it('should warn for deprecated options', () => {
	/* eslint-disable no-console */
	const originalWarn = console.warn;

	console.warn = jest.fn();
	const result = sanitizeConfig(
		{
			food: 'pizza',
		},
		{
			food: {
				deprecated: 'Don’t use!',
			},
		}
	);
	expect(result.food).toBe('pizza');
	expect(console.warn).toBeCalledWith(
		expect.stringMatching('config option is deprecated. Don’t use!')
	);

	console.warn = originalWarn;
	/* eslint-enable no-console */
});

it('should throw for removed options', () => {
	const fn = () =>
		sanitizeConfig(
			{
				food: 'pizza',
			},
			{
				food: {
					removed: 'Don’t use!',
				},
			}
		);
	expect(fn).toThrowError('was removed');
});
