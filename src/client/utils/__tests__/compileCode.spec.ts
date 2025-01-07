import compileCode from '../compileCode';
import config from '../../../scripts/schemas/config';

const compilerConfig = config.compilerConfig.default;

describe('compileCode', () => {
	test('compile ES6 to ES5', () => {
		const result = compileCode(`const {foo, bar} = baz`, compilerConfig);
		expect(result).toMatchInlineSnapshot(`
"var foo = baz.foo;
var bar = baz.bar;"
`);
	});

	test('transform imports to require()', () => {
		const result = compileCode(`import foo from 'bar'`, compilerConfig);
		expect(result).toMatchInlineSnapshot(`
"const bar$0 = require('bar');
const foo = bar$0.default || bar$0;"
`);
	});

	test('transform async/await is not throw an error', () => {
		const onError = jest.fn();
		const result = compileCode(
			`async function asyncFunction() { return await Promise.resolve(); }`,
			compilerConfig,
			onError
		);
		expect(onError).not.toHaveBeenCalled();
		expect(result).toMatchInlineSnapshot(
			`"async function asyncFunction() { return await Promise.resolve(); }"`
		);
	});

	test('transform imports to require() in front of JSX', () => {
		const result = compileCode(
			`
import foo from 'bar';
import Button from 'button';
<Button />`,
			compilerConfig
		);
		expect(result).toMatchInlineSnapshot(`
"
const bar$0 = require('bar');
const foo = bar$0.default || bar$0;
const button$0 = require('button');
const Button = button$0.default || button$0;
React.createElement( Button, null )"
`);
	});

	test('wrap JSX in Fragment if adjacent on line 1', () => {
		const result = compileCode(`<span /><span />`, compilerConfig);
		expect(result).toMatchInlineSnapshot(
			`"React.createElement( React.Fragment, null, React.createElement( 'span', null ), React.createElement( 'span', null ) );"`
		);
	});

	test('don’t wrap JSX in Fragment if there is only one statement', () => {
		const result = compileCode(`<Button />;`, compilerConfig);
		expect(result).toMatchInlineSnapshot(`"React.createElement( Button, null );"`);
	});

	test('don’t wrap JSX in Fragment if it’s in the middle', () => {
		const result = compileCode(
			`const {foo, bar} = baz;
<div>
  <button>Click</button>
</div>`,
			compilerConfig
		);
		expect(result).toMatchInlineSnapshot(`
"var foo = baz.foo;
var bar = baz.bar;
React.createElement( 'div', null,
  React.createElement( 'button', null, \\"Click\\" )
)"
`);
	});

	test('tagged template literals', () => {
		const result = compileCode(
			`const Button = styled.button\`
	color: tomato;
\`;
<Button />
`,
			compilerConfig
		);
		expect(result).toMatchInlineSnapshot(`
"var templateObject = Object.freeze([\\"\\\\n\\\\tcolor: tomato;\\\\n\\"]);
var Button = styled.button(templateObject);
React.createElement( Button, null )
"
`);
	});

	test('onError callback', () => {
		const onError = jest.fn();
		const result = compileCode(`=`, compilerConfig, onError);
		expect(result).toBe('');
		expect(onError).toHaveBeenCalledWith(
			expect.objectContaining({ message: 'Unexpected token (1:0)' })
		);
	});
});
