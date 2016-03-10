import { parse } from 'react-docgen';

import Props, { Code } from 'rsg-components/Props/Props';
import Markdown from 'rsg-components/Markdown';

function render(propTypes, defaultProps = []) {
	let props = parse(`
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
	return <Props props={props}/>;
}

describe('Props', () => {

	it('should render PropTypes.string', () => {
		let result = render(['color: PropTypes.string']);
		expectReactShallow(result).to.contain(
			<tr>
				<td><Code>color</Code></td>
				<td><Code>string</Code></td>
				<td><span>Optional</span></td>
				<td><div/></td>
			</tr>
		);
	});

	it('should render PropTypes.string with a default value', () => {
		let result = render(['color: PropTypes.string'], ['color: "pink"']);
		expectReactShallow(result).to.contain(
			<tr>
				<td><Code>color</Code></td>
				<td><Code>string</Code></td>
				<td><Code>pink</Code></td>
				<td><div/></td>
			</tr>
		);
	});

	it('should render PropTypes.string.isRequired', () => {
		let result = render(['color: PropTypes.string.isRequired']);
		expectReactShallow(result).to.contain(
			<tr>
				<td><Code>color</Code></td>
				<td><Code>string</Code></td>
				<td><span>Required</span></td>
				<td><div/></td>
			</tr>
		);
	});

	it('should render PropTypes.arrayOf', () => {
		let result = render(['colors: PropTypes.arrayOf(PropTypes.string)']);
		expectReactShallow(result).to.contain(
			<tr>
				<td><Code>colors</Code></td>
				<td><Code>string[]</Code></td>
				<td><span>Optional</span></td>
				<td><div/></td>
			</tr>
		);
	});

	it('should render PropTypes.instanceOf', () => {
		let result = render(['num: PropTypes.instanceOf(Number)']);
		expectReactShallow(result).to.contain(
			<tr>
				<td><Code>num</Code></td>
				<td><Code>Number</Code></td>
				<td><span>Optional</span></td>
				<td><div/></td>
			</tr>
		);
	});

	it('should render PropTypes.shape', () => {
		let result = render(['foo: PropTypes.shape({bar: PropTypes.number.isRequired, baz: PropTypes.any})']);
		expectReactShallow(result).to.contain(
			<tr>
				<td><Code>foo</Code></td>
				<td><Code>shape</Code></td>
				<td><span>Optional</span></td>
				<td>
					<div>
						<div>
							<Code>bar</Code>: <Code>number</Code>
						</div>
						<div>
							<Code>baz</Code>: <Code>any</Code> — <span>Optional</span>
						</div>
					</div>
				</td>
			</tr>
		);
	});

	it('should render description in Markdown', () => {
		let result = render(['/**\n * Label\n */\ncolor: PropTypes.string']);
		expectReactShallow(result).to.contain(
			<tr>
				<td><Code>color</Code></td>
				<td><Code>string</Code></td>
				<td><span>Optional</span></td>
				<td><div><Markdown text="Label"/></div></td>
			</tr>
		);
	});

	it('should render unknown proptype for a prop when a relevant proptype is not assigned', () => {
		let result = render([], ['color: "pink"']);
		expectReactShallow(result).to.contain(
			<tr>
				<td><Code>color</Code></td>
				<td><Code>unknown</Code></td>
				<td><Code>pink</Code></td>
				<td><div/></td>
			</tr>
		);
	});

});
