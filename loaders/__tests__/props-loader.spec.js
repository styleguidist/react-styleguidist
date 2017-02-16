import vm from 'vm';
import { readFileSync } from 'fs';
import config from '../../scripts/schemas/config';
import propsLoader from '../props-loader';

const options = {
	styleguidist: {
		handlers: config.handlers.default,
		getExampleFilename: config.getExampleFilename.default,
	},
};

it('should return valid, parsable JS', () => {
	const file = './test/components/Button/Button.js';
	const result = propsLoader.call({
		request: file,
		options,
	}, readFileSync(file, 'utf8'));
	expect(result).toBeTruthy();
	expect(new vm.Script(result)).not.toThrowError(SyntaxError);
});

it('should extract doclets', () => {
	const file = './test/components/Placeholder/Placeholder.js';
	const result = propsLoader.call({
		request: file,
		options,
	}, readFileSync(file, 'utf8'));
	expect(result).toBeTruthy();

	expect(new vm.Script(result)).not.toThrowError(SyntaxError);
	expect(result.includes('makeABarrelRoll')).toBe(false);
	expect(result).toMatch('getImageUrl');
	expect(result).toMatch(/'see': '\{@link link\}'/);
	expect(result).toMatch(/'link': 'link'/);
	expect(result).toMatch(/require\('!!.*?\/loaders\/examples-loader\.js!\.\/examples.md'\)/);
});

it('should attach examples from Markdown file', () => {
	const file = './test/components/Button/Button.js';
	const result = propsLoader.call({
		request: file,
		options,
	}, readFileSync(file, 'utf8'));
	expect(result).toBeTruthy();

	expect(new vm.Script(result)).not.toThrowError(SyntaxError);
	expect(result).toMatch(/require\('!!.*?\/loaders\/examples-loader\.js!test\/components\/Button\/Readme.md'\)/);
});
