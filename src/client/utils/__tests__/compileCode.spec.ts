import compileCode from '../compileCode';
import config from '../../../scripts/schemas/config';

const compileExample = config.compileExample.default;

describe('compileCode', () => {
	test('strips TypeScript type annotations', () => {
		const result = compileCode(
			`const x = (y: number): number => y; console.log(x(1))`,
			compileExample
		);
		expect(result).toMatchInlineSnapshot(`
		"\\"use strict\\";const x = (y) => y;
		return (console.log(x(1)));"
	`);
	});

	test('transform imports to require()', () => {
		const result = compileCode(`import foo from 'bar'; foo()`, compileExample);
		expect(result).toMatchInlineSnapshot(`
		"\\"use strict\\"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bar = require('bar'); var _bar2 = _interopRequireDefault(_bar);
		return (_bar2.default.call(void 0, ));"
	`);
	});

	test('transform async/await is not throw an error', () => {
		const onError = jest.fn();
		const result = compileCode(
			`async function asyncFunction() { return await Promise.resolve(); }; asyncFunction()`,
			compileExample,
			onError
		);
		expect(onError).not.toHaveBeenCalled();
		expect(result).toMatchInlineSnapshot(`
		"\\"use strict\\";async function asyncFunction() { return await Promise.resolve(); };
		return (asyncFunction());"
	`);
	});

	test('transform imports to require() in front of JSX', () => {
		const result = compileCode(
			`
import foo from 'bar';
import Button from 'button';
<Button />`,
			compileExample
		);
		expect(result).toMatchInlineSnapshot(`
		"\\"use strict\\";const _jsxFileName = \\"\\"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var _button = require('button'); var _button2 = _interopRequireDefault(_button);
		return (React.createElement(_button2.default, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 4}} ));"
	`);
	});

	test('wrap JSX in Fragment', () => {
		const result = compileCode(
			`<div>
  <button>Click</button>
</div>`,
			compileExample
		);
		expect(result).toMatchInlineSnapshot(`
		"\\"use strict\\";const _jsxFileName = \\"\\";
		return (React.createElement(React.Fragment, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1}}, React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 1}}
		  , React.createElement('button', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2}}, \\"Click\\")
		)));"
	`);
	});

	test('don’t wrap JSX in Fragment if it’s in the middle', () => {
		const result = compileCode(
			`const {foo, bar} = baz;
<div>
  <button>Click</button>
</div>`,
			compileExample
		);
		expect(result).toMatchInlineSnapshot(`
		"\\"use strict\\";const _jsxFileName = \\"\\";const {foo, bar} = baz;
		return (React.createElement('div', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 2}}
		  , React.createElement('button', {__self: this, __source: {fileName: _jsxFileName, lineNumber: 3}}, \\"Click\\")
		));"
	`);
	});

	test('tagged template literals', () => {
		const result = compileCode(
			`const Button = styled.button\`
	color: tomato;
\`;
<Button />
`,
			compileExample
		);
		expect(result).toMatchInlineSnapshot(`
		"\\"use strict\\";const _jsxFileName = \\"\\";const Button = styled.button\`
			color: tomato;
		\`;
		return (React.createElement(Button, {__self: this, __source: {fileName: _jsxFileName, lineNumber: 4}} ));"
	`);
	});

	test('onError callback', () => {
		const onError = jest.fn();
		const result = compileCode(`=`, compileExample, onError);
		expect(result).toBe('');
		expect(onError).toHaveBeenCalledTimes(1);
		expect(onError.mock.calls[0][0].toString()).toBe('SyntaxError: Unexpected token (1:1)');
	});
});
