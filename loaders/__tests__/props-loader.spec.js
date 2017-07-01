import vm from 'vm';
import { readFileSync } from 'fs';
import glogg from 'glogg';
import config from '../../scripts/schemas/config';
import propsLoader from '../props-loader';

const logger = glogg('rsg');

const _styleguidist = {
	handlers: config.handlers.default,
	getExampleFilename: config.getExampleFilename.default,
};

it('should return valid, parsable JS', () => {
	const file = './test/components/Button/Button.js';
	const result = propsLoader.call(
		{
			request: file,
			_styleguidist,
		},
		readFileSync(file, 'utf8')
	);
	expect(result).toBeTruthy();
	expect(() => new vm.Script(result)).not.toThrow();
});

it('should extract doclets', () => {
	const file = './test/components/Placeholder/Placeholder.js';
	const result = propsLoader.call(
		{
			request: file,
			_styleguidist,
		},
		readFileSync(file, 'utf8')
	);
	expect(result).toBeTruthy();

	expect(() => new vm.Script(result)).not.toThrow();
	expect(result.includes('makeABarrelRoll')).toBe(false);
	expect(result).toMatch('getImageUrl');
	expect(result).toMatch(/'see': '\{@link link\}'/);
	expect(result).toMatch(/'link': 'link'/);
	expect(result).toMatch(/require\('!!.*?\/loaders\/examples-loader\.js!\.\/examples.md'\)/);
});

it('should not render ignored props', () => {
	const file = './test/components/Button/Button.js';
	const result = propsLoader.call(
		{
			request: file,
			_styleguidist,
		},
		readFileSync(file, 'utf8')
	);
	expect(result).toBeTruthy();

	expect(() => new vm.Script(result)).not.toThrow();
	expect(result.includes('ignoredProp')).toBe(false);
});

it('should attach examples from Markdown file', () => {
	const file = './test/components/Button/Button.js';
	const result = propsLoader.call(
		{
			request: file,
			_styleguidist,
		},
		readFileSync(file, 'utf8')
	);
	expect(result).toBeTruthy();

	expect(() => new vm.Script(result)).not.toThrow();
	expect(result).toMatch(
		/require\('!!.*?\/loaders\/examples-loader\.js!test\/components\/Button\/Readme.md'\)/
	);
});

it('should warn if no componets are exported', () => {
	const warn = jest.fn();
	logger.once('warn', warn);

	const file = __filename;
	const result = propsLoader.call(
		{
			request: file,
			_styleguidist,
		},
		readFileSync(file, 'utf8')
	);
	expect(result).toBeTruthy();

	expect(() => new vm.Script(result)).not.toThrow();
	expect(warn).toBeCalledWith(expect.stringMatching('doesn’t export a component'));
});

it('should warn if a file cannot be parsed', () => {
	const warn = jest.fn();
	logger.once('warn', warn);

	const file = './test/components/Button/Readme.md';
	const result = propsLoader.call(
		{
			request: file,
			_styleguidist,
		},
		readFileSync(file, 'utf8')
	);
	expect(result).toBeTruthy();

	expect(() => new vm.Script(result)).not.toThrow();
	expect(warn).toBeCalledWith(expect.stringMatching('Cannot parse'));
});
