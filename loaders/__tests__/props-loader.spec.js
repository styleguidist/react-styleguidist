import { readFileSync } from 'fs';
import propsLoader from '../props-loader';

it('should return valid, parsable JS', () => {
	const file = './test/components/Button/Button.js';
	const result = propsLoader.call({
		request: file,
		options: {
			styleguidist: {},
		},
	}, readFileSync(file, 'utf8'));
	expect(result).toBeTruthy();
	expect(() => new Function(result)).not.toThrowError(SyntaxError);  // eslint-disable-line no-new-func
});

it('should extract doclets', () => {
	const file = './test/components/Placeholder/Placeholder.js';
	const result = propsLoader.call({
		request: file,
		options: {
			styleguidist: {},
		},
	}, readFileSync(file, 'utf8'));
	expect(result).toBeTruthy();

	expect(() => new Function(result)).not.toThrowError(SyntaxError);  // eslint-disable-line no-new-func
	expect(result.includes("require('!!../loaders/examples-loader!./examples.md')")).toBe(true);
	expect(result.includes('getImageUrl')).toBe(true);
	expect(result.includes('makeABarrelRoll')).toBe(false);
});
