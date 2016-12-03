import React from 'react';
import { parse } from 'react-docgen';
import { PropsRenderer } from './PropsRenderer';
import { unquote, getType } from './util';

function render(propTypes, defaultProps = []) {
	const props = parse(`
		import { Component, PropTypes } from 'react';
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

	expect(shallowToJson(actual)).toMatchSnapshot();
});

it('should render PropTypes.string with a default value', () => {
	const actual = render(['color: PropTypes.string'], ['color: "pink"']);

	expect(shallowToJson(actual)).toMatchSnapshot();
});

it('should render PropTypes.string.isRequired', () => {
	const actual = render(['color: PropTypes.string.isRequired']);

	expect(shallowToJson(actual)).toMatchSnapshot();
});

it('should render PropTypes.arrayOf', () => {
	const actual = render(['colors: PropTypes.arrayOf(PropTypes.string)']);

	expect(shallowToJson(actual)).toMatchSnapshot();
});

it('should render PropTypes.instanceOf', () => {
	const actual = render(['num: PropTypes.instanceOf(Number)']);

	expect(shallowToJson(actual)).toMatchSnapshot();
});

it('should render PropTypes.shape', () => {
	const actual = render(['foo: PropTypes.shape({bar: PropTypes.number.isRequired, baz: PropTypes.any})']);

	expect(shallowToJson(actual)).toMatchSnapshot();
});

it('should render description in Markdown', () => {
	const actual = render(['/**\n * Label\n */\ncolor: PropTypes.string']);

	expect(shallowToJson(actual)).toMatchSnapshot();
});

it('should render unknown proptype for a prop when a relevant proptype is not assigned', () => {
	const actual = render([], ['color: "pink"']);

	expect(shallowToJson(actual)).toMatchSnapshot();
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
