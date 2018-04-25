/* eslint-disable react/prop-types */
import React from 'react';
import { parse } from 'react-docgen';
import PropsRenderer, { columns, getRowKey } from './PropsRenderer';
import { unquote, getType, showSpaces } from './util';

const propsToArray = props => Object.keys(props).map(name => ({ ...props[name], name }));

// Test renderers with clean readable snapshot diffs
export default function ColumnsRenderer({ props }) {
	return (
		<ul>
			{props.map((row, rowIdx) => (
				<li key={rowIdx}>
					{columns.map(({ render }, colIdx) => <div key={colIdx}>{render(row)}</div>)}
				</li>
			))}
		</ul>
	);
}

function render(propTypes, defaultProps = []) {
	const props = parse(`
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
	`);
	return shallow(<ColumnsRenderer props={propsToArray(props.props)} />);
}

function renderFlow(propsType, defaultProps = []) {
	const props = parse(`
	  // @flow
		import * as React from 'react';
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
	`);
	return shallow(<ColumnsRenderer props={propsToArray(props.props)} />);
}

describe('PropsRenderer', () => {
	it('should render a table', () => {
		const actual = shallow(
			<PropsRenderer
				props={[{ type: { name: 'string' }, required: false, description: '', name: 'color' }]}
			/>
		);

		expect(actual).toMatchSnapshot();
	});
});

describe('props columns', () => {
	it('should render PropTypes.string', () => {
		const actual = render(['color: PropTypes.string']);

		expect(actual).toMatchSnapshot();
	});

	it('should render PropTypes.string with a default value', () => {
		const actual = render(['color: PropTypes.string'], ['color: "pink"']);

		expect(actual).toMatchSnapshot();
	});

	it('should render PropTypes.string.isRequired', () => {
		const actual = render(['color: PropTypes.string.isRequired']);

		expect(actual).toMatchSnapshot();
	});

	it('should render PropTypes.arrayOf', () => {
		const actual = render(['colors: PropTypes.arrayOf(PropTypes.string)']);

		expect(actual).toMatchSnapshot();
	});

	it('should render PropTypes.arrayOf(PropTypes.shape)', () => {
		const actual = render([
			'foos: PropTypes.arrayOf(PropTypes.shape({bar: PropTypes.number, baz: PropTypes.any}))',
		]);

		expect(actual).toMatchSnapshot();
	});

	it('should render PropTypes.instanceOf', () => {
		const actual = render(['num: PropTypes.instanceOf(Number)']);

		expect(actual).toMatchSnapshot();
	});

	it('should render PropTypes.shape', () => {
		const actual = render([
			'foo: PropTypes.shape({bar: PropTypes.number.isRequired, baz: PropTypes.any})',
		]);

		expect(actual).toMatchSnapshot();
	});

	it('should render PropTypes.shape with formatted defaultProps', () => {
		const actual = render(
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

		expect(actual).toMatchSnapshot();
	});

	it('should render PropTypes.shape defaultProps, falling back to Object', () => {
		const actual = render(
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

		expect(actual).toMatchSnapshot();
	});

	it('should render PropTypes.shape with description', () => {
		const actual = render([
			`foo: PropTypes.shape({
			/**
			 * Number
			 */
			bar: PropTypes.number.isRequired,
			/** Any */
			baz: PropTypes.any
		})`,
		]);

		expect(actual).toMatchSnapshot();
	});

	it('should render PropTypes.objectOf', () => {
		const actual = render(['colors: PropTypes.objectOf(PropTypes.string)']);

		expect(actual).toMatchSnapshot();
	});

	it('should render PropTypes.objectOf(PropTypes.shape)', () => {
		const actual = render([
			`colors: PropTypes.objectOf(
			PropTypes.shape({
				bar: PropTypes.number.isRequired,
				baz: PropTypes.any
			})
		)`,
		]);

		expect(actual).toMatchSnapshot();
	});

	it('should render PropTypes.oneOf', () => {
		const actual = render(['size: PropTypes.oneOf(["small", "normal", "large"])']);

		expect(actual).toMatchSnapshot();
	});

	it('should render PropTypes.oneOfType', () => {
		const actual = render(['union: PropTypes.oneOfType([PropTypes.string, PropTypes.number])']);

		expect(actual).toMatchSnapshot();
	});

	it('should render description in Markdown', () => {
		const actual = render(['/**\n * Label\n */\ncolor: PropTypes.string']);

		expect(actual).toMatchSnapshot();
	});

	it('should render unknown proptype for a prop when a relevant proptype is not assigned', () => {
		const actual = render([], ['color: "pink"']);

		expect(actual).toMatchSnapshot();
	});

	it('should render function body in tooltip', () => {
		const actual = render(['fn: PropTypes.func'], ['fn: (e) => console.log(e)']);

		expect(actual).toMatchSnapshot();
	});

	it('should render function defaultValue as code when undefined', () => {
		const actual = render(['fn: PropTypes.func'], ['fn: undefined']);

		expect(actual).toMatchSnapshot();
	});

	it('should render function defaultValue as code when null', () => {
		const actual = render(['fn: PropTypes.func'], ['fn: null']);

		expect(actual).toMatchSnapshot();
	});

	it('should render arguments from JsDoc tags', () => {
		const props = [
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
							type: { name: 'Array' },
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
		const actual = shallow(<ColumnsRenderer props={props} />);

		expect(actual).toMatchSnapshot();
	});

	it('should render return from JsDoc tags', () => {
		const getProps = tag => [
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
							type: { name: 'Array' },
						},
					],
				},
			},
		];

		const actualForReturn = shallow(<ColumnsRenderer props={getProps('return')} />);

		expect(actualForReturn).toMatchSnapshot();

		const actualForReturns = shallow(<ColumnsRenderer props={getProps('returns')} />);

		expect(actualForReturns).toMatchSnapshot();
	});

	it('should render name as deprecated when tag deprecated is present', () => {
		const props = [
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
		const actual = shallow(<ColumnsRenderer props={props} />);

		expect(actual).toMatchSnapshot();
	});

	it('should render type string', () => {
		const actual = renderFlow(['foo: string']);

		expect(actual).toMatchSnapshot();
	});

	it('should render optional type string', () => {
		const actual = renderFlow(['foo?: string']);

		expect(actual).toMatchSnapshot();
	});

	it('should render type string with a default value', () => {
		const actual = renderFlow(['foo?: string'], ['foo: "bar"']);

		expect(actual).toMatchSnapshot();
	});

	it('should render literal type', () => {
		const actual = renderFlow(['foo?: "bar"']);

		expect(actual).toMatchSnapshot();
	});

	it('should render object type with body in tooltip', () => {
		const actual = renderFlow(['foo: { bar: string }']);

		expect(actual).toMatchSnapshot();
	});

	it('should render function type with body in tooltip', () => {
		const actual = renderFlow(['foo: () => void']);

		expect(actual).toMatchSnapshot();
	});

	it('should render union type with body in tooltip', () => {
		const actual = renderFlow(['foo: "bar" | number']);

		expect(actual).toMatchSnapshot();
	});

	it('should render tuple type with body in tooltip', () => {
		const actual = renderFlow(['foo: ["bar", number]']);

		expect(actual).toMatchSnapshot();
	});

	it('should render custom class type', () => {
		const actual = renderFlow(['foo: React.ReactNode']);

		expect(actual).toMatchSnapshot();
	});
});

describe('unquote', () => {
	it('should remove double quotes around the string', () => {
		const result = unquote('"foo"');
		expect(result).toBe('foo');
	});

	it('should remove single quotes around the string', () => {
		const result = unquote("'foo'");
		expect(result).toBe('foo');
	});

	it('should not remove quotes in the middle of the string', () => {
		const result = unquote('foo"bar');
		expect(result).toBe('foo"bar');
	});
});

describe('getType', () => {
	it('should return .type or .flowType property', () => {
		const result = getType({
			type: 'foo',
			flowType: 'bar',
		});
		expect(result).toBe('bar');
	});
});

describe('showSpaces', () => {
	it('should replace leading and trailing spaces with a visible character', () => {
		const result = showSpaces(' pizza ');
		expect(result).toBe('␣pizza␣');
	});
});

describe('getRowKey', () => {
	it('should return type name', () => {
		const result = getRowKey({ name: 'number' });
		expect(result).toBe('number');
	});
});
