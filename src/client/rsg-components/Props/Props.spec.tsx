/* eslint-disable react/prop-types */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { parse } from 'react-docgen';
import PropsRenderer, { columns, getRowKey } from './PropsRenderer';
import { unquote, getType, showSpaces, PropDescriptor } from './util';

const propsToArray = (props: any) => Object.keys(props).map(name => ({ ...props[name], name }));

const getText = (node: { innerHTML: string }): string =>
	node.innerHTML
		.replace(/<\/?(div|li|p).*?>/g, '\n')
		.replace(/<.*?>/g, ' ')
		.replace(/[\r\n]+/g, '\n')
		.replace(/ +/g, ' ')
		.trim();

// Test renderers with clean readable snapshot diffs
export default function ColumnsRenderer({ props }: { props: PropDescriptor[] }) {
	return (
		<>
			{props.map((row, rowIdx) => (
				<React.Fragment key={rowIdx}>
					{columns.map((col, colIdx) => (
						<div key={colIdx}>
							{col.caption}: {col.render(row)}
						</div>
					))}
				</React.Fragment>
			))}
		</>
	);
}

function renderJs(propTypes: string[], defaultProps: string[] = []) {
	const props = parse(
		`
		import { Component } from 'react';
		import PropTypes from 'prop-types';
		export default class Cmpnt extends Component {
			static propTypes = {
				${propTypes.join(',')}
			}
			static defaultProps = {
				${defaultProps.join(',')}
			}
			render() {
			}
		}
	`,
		undefined,
		undefined,
		{ filename: '' }
	);
	if (Array.isArray(props)) {
		return render(<div />);
	}
	return render(<ColumnsRenderer props={propsToArray(props.props)} />);
}

function renderFlow(propsType: string[], defaultProps: string[] = [], preparations: string[] = []) {
	const props = parse(
		`
		// @flow
		import * as React from 'react';
		${preparations.join(';')}
		type Props = {
			${propsType.join(',')}
		};
		export default class Cmpnt extends React.Component<Props> {
			static defaultProps = {
				${defaultProps.join(',')}
			}
			render() {
			}
		}
	`,
		undefined,
		undefined,
		{ filename: '' }
	);
	if (Array.isArray(props)) {
		return render(<div />);
	}
	return render(<ColumnsRenderer props={propsToArray(props.props)} />);
}

function renderTypeScript(
	propsType: string[],
	defaultProps: string[] = [],
	preparations: string[] = []
) {
	const props = parse(
		`
		import * as React from 'react';
		${preparations.join(';')}
		type Props = {
			${propsType.join(';')}
		};
		export default class Cmpnt extends React.Component<Props> {
			static defaultProps = {
				${defaultProps.join(',')}
			}
			render() {
			}
		}
	`,
		undefined,
		undefined,
		{ filename: 'Component.tsx' }
	);
	if (Array.isArray(props)) {
		return render(<div />);
	}
	return render(<ColumnsRenderer props={propsToArray(props.props)} />);
}

describe('PropsRenderer', () => {
	test('should render a table', async () => {
		const { findAllByRole } = render(
			<PropsRenderer
				props={[
					{
						name: 'color',
						type: { name: 'string' },
						required: false,
						defaultValue: { value: 'tomato' },
						description: 'Butiful',
					},
				]}
			/>
		);
		expect((await findAllByRole('columnheader')).map(node => node.textContent)).toEqual([
			'Prop name',
			'Type',
			'Default',
			'Description',
		]);
		expect((await findAllByRole('cell')).map(node => node.textContent)).toEqual([
			'color',
			'string',
			'tomato',
			'Butiful',
		]);
	});
});

describe('props columns', () => {
	test('should render PropTypes.string', () => {
		const { container } = renderJs(['color: PropTypes.string']);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: color 
		Type: string 
		Default: 
		Description:"
	`);
	});

	test('should render PropTypes.string with a default value', () => {
		const { container } = renderJs(['color: PropTypes.string'], ['color: "pink"']);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: color 
		Type: string 
		Default: pink 
		Description:"
	`);
	});

	test('should render PropTypes.string.isRequired', () => {
		const { container } = renderJs(['color: PropTypes.string.isRequired']);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: color 
		Type: string 
		Default: Required 
		Description:"
	`);
	});

	test('should render PropTypes.arrayOf', () => {
		const { container } = renderJs(['colors: PropTypes.arrayOf(PropTypes.string)']);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: colors 
		Type: string[] 
		Default: 
		Description:"
	`);
	});

	test('should render PropTypes.arrayOf(PropTypes.shape)', () => {
		const { container } = renderJs([
			'foos: PropTypes.arrayOf(PropTypes.shape({bar: PropTypes.number, baz: PropTypes.any}))',
		]);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: foos 
		Type: shape[] 
		Default: 
		Description: 
		 bar : number 
		 baz : any"
	`);
	});

	test('should render PropTypes.arrayOf(PropTypes.exact)', () => {
		const { container } = renderJs([
			'foos: PropTypes.arrayOf(PropTypes.exact({bar: PropTypes.number, baz: PropTypes.any}))',
		]);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: foos 
		Type: exact[] 
		Default: 
		Description: 
		 bar : number 
		 baz : any"
	`);
	});

	test('should render PropTypes.instanceOf', () => {
		const { container } = renderJs(['num: PropTypes.instanceOf(Number)']);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: num 
		Type: Number 
		Default: 
		Description:"
	`);
	});

	test('should render PropTypes.shape', () => {
		const { container } = renderJs([
			'foo: PropTypes.shape({bar: PropTypes.number.isRequired, baz: PropTypes.any})',
		]);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: foo 
		Type: shape 
		Default: 
		Description: 
		 bar : number — Required 
		 baz : any"
	`);
	});

	test('should render PropTypes.exact', () => {
		const { container } = renderJs([
			'foo: PropTypes.exact({bar: PropTypes.number.isRequired, baz: PropTypes.any})',
		]);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: foo 
		Type: exact 
		Default: 
		Description: 
		 bar : number — Required 
		 baz : any"
	`);
	});

	test('should render PropTypes.shape with formatted defaultProps', () => {
		const { getByText } = renderJs(
			[
				`
				foo: PropTypes.shape({
					bar: PropTypes.number.isRequired,
					baz: PropTypes.any,
				})
			`,
			],
			[
				`
				foo: {
					bar: 123, baz() {
						return 'foo';
					},
					bing() {
						return 'badaboom';
					},
					trotskij: () => 1935,
					qwarc: { si: 'señor', },
				}
			`,
			]
		);

		expect(getByText('Shape').title).toMatchInlineSnapshot(`
		"{
		  \\"bar\\": 123,
		  \\"qwarc\\": {
		    \\"si\\": \\"señor\\"
		  }
		}"
	`);
	});

	test('should render PropTypes.shape defaultProps, falling back to Object', () => {
		const { container, getByText } = renderJs(
			[
				`
				foo: PropTypes.shape({
					bar: PropTypes.number.isRequired,
					baz: PropTypes.any,
				})
			`,
			],
			[
				`
				foo: somethingThatDoesntExist
			`,
			]
		);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: foo 
		Type: shape 
		Default: Shape 
		Description: 
		 bar : number — Required 
		 baz : any"
	`);

		// FIXME: This doesn't look correct, where's foo?
		expect(getByText('Shape').title).toMatchInlineSnapshot(`"somethingThatDoesntExist"`);
	});

	test('should render PropTypes.shape with description', () => {
		const { container } = renderJs([
			`foo: PropTypes.shape({
			/**
			 * Number
			 */
			bar: PropTypes.number.isRequired,
			/** Any */
			baz: PropTypes.any
		})`,
		]);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: foo 
		Type: shape 
		Default: 
		Description: 
		 bar : number — Required — Number 
		 baz : any — Any"
	`);
	});

	test('should render PropTypes.exact with description', () => {
		const { container } = renderJs([
			`foo: PropTypes.exact({
			/**
			 * Number
			 */
			bar: PropTypes.number.isRequired,
			/** Any */
			baz: PropTypes.any
		})`,
		]);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: foo 
		Type: exact 
		Default: 
		Description: 
		 bar : number — Required — Number 
		 baz : any — Any"
	`);
	});

	test('should render PropTypes.objectOf', () => {
		const { container } = renderJs(['colors: PropTypes.objectOf(PropTypes.string)']);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: colors 
		Type: {string} 
		Default: 
		Description:"
	`);
	});

	test('should render PropTypes.objectOf(PropTypes.shape)', () => {
		const { container } = renderJs([
			`colors: PropTypes.objectOf(
			PropTypes.shape({
				bar: PropTypes.number.isRequired,
				baz: PropTypes.any
			})
		)`,
		]);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: colors 
		Type: {shape} 
		Default: 
		Description: 
		 bar : number — Required 
		 baz : any"
	`);
	});

	test('should render PropTypes.objectOf(PropTypes.exact)', () => {
		const { container } = renderJs([
			`colors: PropTypes.objectOf(
			PropTypes.exact({
				bar: PropTypes.number.isRequired,
				baz: PropTypes.any
			})
		)`,
		]);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: colors 
		Type: {exact} 
		Default: 
		Description: 
		 bar : number — Required 
		 baz : any"
	`);
	});

	test('should render PropTypes.oneOf', () => {
		const { container } = renderJs(['size: PropTypes.oneOf(["small", "normal", "large"])']);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: size 
		Type: enum 
		Default: 
		Description: 
		 One of: small , normal , large"
	`);
	});

	test('should render PropTypes.oneOfType', () => {
		const { container } = renderJs([
			'union: PropTypes.oneOfType([PropTypes.string, PropTypes.number])',
		]);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: union 
		Type: union 
		Default: 
		Description: 
		 One of type: string , number"
	`);
	});

	test('should render description in Markdown', () => {
		const { container } = renderJs(['/**\n * Label\n */\ncolor: PropTypes.string']);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: color 
		Type: string 
		Default: 
		Description: 
		Label"
	`);
	});

	test('should render unknown proptype for a prop when a relevant proptype is not assigned', () => {
		const { container } = renderJs([], ['color: "pink"']);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: color 
		Type: 
		Default: pink 
		Description:"
	`);
	});

	test('should render function body in tooltip', () => {
		const { getByText } = renderJs(['fn: PropTypes.func'], ['fn: (e) => console.log(e)']);

		expect(getByText('Function').title).toMatchInlineSnapshot(`"(e) => console.log(e)"`);
	});

	test('should render function defaultValue as code when undefined', () => {
		const { container } = renderJs(['fn: PropTypes.func'], ['fn: undefined']);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: fn 
		Type: func 
		Default: undefined 
		Description:"
	`);
	});

	test('should render function defaultValue as code when null', () => {
		const { container } = renderJs(['fn: PropTypes.func'], ['fn: null']);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: fn 
		Type: func 
		Default: null 
		Description:"
	`);
	});

	test('should render arguments from JsDoc tags', () => {
		const props: any = [
			{
				name: 'size',
				type: {
					name: 'number',
				},
				required: false,
				description: 'Test description',
				tags: {
					arg: [
						{
							name: 'Foo',
							description: 'Converts foo to bar',
							type: { type: 'NameExpression', name: 'Array' },
						},
					],
					param: [
						{
							name: 'Bar',
						},
					],
				},
			},
		];
		const { container } = render(<ColumnsRenderer props={props} />);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: size 
		Type: number 
		Default: 
		Description: 
		Test description
		 Arguments 
		 Foo : Array — Converts foo to bar Bar"
	`);
	});

	test('should render return from JsDoc tags', () => {
		const getProps = (tag: string): any => [
			{
				name: 'size',
				type: {
					name: 'number',
				},
				required: false,
				description: 'Test description',
				tags: {
					[tag]: [
						{
							title: 'Foo',
							description: 'Returns foo from bar',
							type: { type: 'NameExpression', name: 'Array' },
						},
					],
				},
			},
		];

		const { container: returnContainer } = render(<ColumnsRenderer props={getProps('return')} />);

		expect(getText(returnContainer)).toMatchInlineSnapshot(`
		"Prop name: size 
		Type: number 
		Default: 
		Description: 
		Test description
		Returns Array — Returns foo from bar"
	`);

		const { container: returnsContainer } = render(<ColumnsRenderer props={getProps('returns')} />);

		expect(getText(returnsContainer)).toMatchInlineSnapshot(`
		"Prop name: size 
		Type: number 
		Default: 
		Description: 
		Test description
		Returns Array — Returns foo from bar"
	`);
	});

	test('should render name as deprecated when tag deprecated is present', () => {
		const props: any[] = [
			{
				name: 'size',
				type: {
					name: 'number',
				},
				required: false,
				description: 'Test description',
				tags: {
					deprecated: [
						{
							title: 'deprecated',
							description: 'Do not use.',
						},
					],
				},
			},
		];
		const { container } = render(<ColumnsRenderer props={props} />);

		expect(getText(container)).toMatchInlineSnapshot(`
		"Prop name: size 
		Type: number 
		Default: 
		Description: 
		Test description
		 Deprecated: Do not use."
	`);
	});

	describe.each([
		[
			'flowType',
			renderFlow,
			{ enum: { declaration: "type MyEnum = 'One' | 'Two'", expect: { type: 'enum' } } },
		],
		[
			'TypeScript',
			renderTypeScript,
			{ enum: { declaration: 'enum MyEnum { One, Two }', expect: { type: 'MyEnum' } } },
		],
	])('%s', (_, renderFn, options) => {
		test('should render type string', () => {
			const { container } = renderFn(['foo: string']);

			expect(getText(container)).toMatchInlineSnapshot(`
			"Prop name: foo 
			Type: string 
			Default: Required 
			Description:"
		`);
		});

		test('should render optional type string', () => {
			const { container } = renderFn(['foo?: string']);

			expect(getText(container)).toMatchInlineSnapshot(`
			"Prop name: foo 
			Type: string 
			Default: 
			Description:"
		`);
		});

		test('should render type string with a default value', () => {
			const { container } = renderFn(['foo?: string'], ['foo: "bar"']);

			expect(getText(container)).toMatchInlineSnapshot(`
			"Prop name: foo 
			Type: string 
			Default: bar 
			Description:"
		`);
		});

		test('should render object type with body in tooltip', () => {
			const { container, getByRole } = renderFn(['foo: { bar: string }']);
			fireEvent.focus(getByRole('button'));

			expect(getByRole('button')).toHaveTextContent('object');
			expect(container.querySelector('[data-tippy-root]')).toHaveTextContent('{ bar: string }');
		});

		test('should render function type with body in tooltip', () => {
			const { container, getByRole } = renderFn(['foo: () => void']);
			fireEvent.focus(getByRole('button'));

			expect(getByRole('button')).toHaveTextContent('function');
			expect(container.querySelector('[data-tippy-root]')).toHaveTextContent('() => void');
		});

		test('should render union type with body in tooltip', () => {
			const { container, getByRole } = renderFn(['foo: "bar" | number']);
			fireEvent.focus(getByRole('button'));

			expect(getByRole('button')).toHaveTextContent('union');
			expect(container.querySelector('[data-tippy-root]')).toHaveTextContent('"bar" | number');
		});

		test('should render enum type', () => {
			const { container } = renderFn(['foo: MyEnum'], [], [options.enum.declaration]);
			if (options.enum.expect.type === 'enum') {
				expect(getText(container)).toMatchInlineSnapshot(`
					"Prop name: foo 
					Type: ${options.enum.expect.type} 
					Default: Required 
					Description: 
					 One of: One , Two"
				`);
			} else {
				expect(getText(container)).toMatchInlineSnapshot(`
					"Prop name: foo 
					Type: ${options.enum.expect.type} 
					Default: Required 
					Description:"
				`);
			}
		});

		test('should render tuple type with body in tooltip', () => {
			const { container, getByRole } = renderFn(['foo: ["bar", number]']);

			fireEvent.focus(getByRole('button'));

			expect(getByRole('button')).toHaveTextContent('tuple');
			expect(container.querySelector('[data-tippy-root]')).toHaveTextContent('["bar", number]');
		});

		test('should render custom class type', () => {
			const { container } = renderFn(['foo: React.ReactNode']);

			expect(getText(container)).toMatchInlineSnapshot(`
			"Prop name: foo 
			Type: React.ReactNode 
			Default: Required 
			Description:"
		`);
		});

		test('should render unknown when a relevant prop type is not assigned', () => {
			const { container } = renderFn([], ['color: "pink"']);

			expect(getText(container)).toMatchInlineSnapshot(`
			"Prop name: color 
			Type: 
			Default: pink 
			Description:"
		`);
		});

		test('should render literal type', () => {
			const { container } = renderFn(['foo: 1']);

			expect(getText(container)).toMatchInlineSnapshot(`
			"Prop name: foo 
			Type: 1 
			Default: Required 
			Description:"
		`);
		});
	});
});

describe('unquote', () => {
	test('should remove double quotes around the string', () => {
		const result = unquote('"foo"');
		expect(result).toBe('foo');
	});

	test('should remove single quotes around the string', () => {
		const result = unquote("'foo'");
		expect(result).toBe('foo');
	});

	test('should not remove quotes in the middle of the string', () => {
		const result = unquote('foo"bar');
		expect(result).toBe('foo"bar');
	});
});

describe('getType', () => {
	test('should return not .type but .flowType property', () => {
		const result = getType({
			type: 'foo',
			flowType: 'bar',
		} as any);
		expect(result).toBe('bar');
	});

	test('should return not .type but .tsType property', () => {
		const result = getType({
			type: 'foo',
			tsType: 'bar',
		} as any);
		expect(result).toBe('bar');
	});

	test('should return .type property', () => {
		const result = getType({
			type: 'foo',
		} as any);
		expect(result).toBe('foo');
	});
});

describe('showSpaces', () => {
	test('should replace leading and trailing spaces with a visible character', () => {
		const result = showSpaces(' pizza ');
		expect(result).toBe('␣pizza␣');
	});
});

describe('getRowKey', () => {
	test('should return type name', () => {
		const result = getRowKey({ name: 'number' });
		expect(result).toBe('number');
	});
});
