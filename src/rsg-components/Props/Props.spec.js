import React from 'react';
import { parse } from 'react-docgen';
import { PropsRenderer } from './PropsRenderer';
import { unquote, getType } from './util';

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
	return shallow(<PropsRenderer props={props.props} classes={{}} />);
}

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

it('should render PropTypes.shape with description', () => {
	const actual = render([
		`foo: PropTypes.shape({
		/**
		* Number
		*/
		bar: PropTypes.number.isRequired, 
		/**
		* Any
		*/
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

it('should render arguments from JsDoc tags', () => {
	const props = {
		size: {
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
	};

	const actual = shallow(<PropsRenderer classes={{}} props={props} />);

	expect(actual).toMatchSnapshot();
});

it('should render name as deprecated when tag deprecated is present', () => {
	const props = {
		size: {
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
	};

	const actual = shallow(<PropsRenderer classes={{}} props={props} />);

	expect(actual).toMatchSnapshot();
});

it('unquote() should remove double quotes around the string', () => {
	const result = unquote('"foo"');
	expect(result).toBe('foo');
});

it('unquote() should remove single quotes around the string', () => {
	const result = unquote("'foo'");
	expect(result).toBe('foo');
});

it('unquote() should not remove quotes in the middle of the string', () => {
	const result = unquote('foo"bar');
	expect(result).toBe('foo"bar');
});

it('getType() should return .type or .flowType property', () => {
	const result = getType({
		type: 'foo',
		flowType: 'bar',
	});
	expect(result).toBe('bar');
});
