import compileCode from '../compileCode';

describe('compileCode', () => {
	test('compile ES6 to ES5', () => {
		const result = compileCode(`const {foo, bar} = baz`);
		expect(result).toMatchInlineSnapshot(`
"var foo = baz.foo;
var bar = baz.bar;"
`);
	});

	test('transform imports to require()', () => {
		const result = compileCode(`import foo from 'bar'`);
		expect(result).toMatchInlineSnapshot(`
"function ri$interop(m){return m.default||m}
var foo = ri$interop(require('bar'));"
`);
	});

	test('wrap JSX in Fragment', () => {
		const result = compileCode(`<div>
  <button>Click</button>
</div>`);
		expect(result).toMatchInlineSnapshot(`
"React.createElement( React.Fragment, null, React.createElement( 'div', null,
  React.createElement( 'button', null, \\"Click\\" )
) );"
`);
	});

	test('don’t wrap JSX in Fragment if it’s in the middle', () => {
		const result = compileCode(`const {foo, bar} = baz;
<div>
  <button>Click</button>
</div>`);
		expect(result).toMatchInlineSnapshot(`
"var foo = baz.foo;
var bar = baz.bar;
React.createElement( 'div', null,
  React.createElement( 'button', null, \\"Click\\" )
)"
`);
	});
});
