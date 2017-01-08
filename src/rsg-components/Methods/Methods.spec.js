import test from 'ava';
import React from 'react';
import { parse } from 'react-docgen';
import Group from 'react-group';
import Code from '../Code';
import Markdown from '../Markdown';
import MethodsRenderer from './MethodsRenderer';

function render(methods) {
	const parsed = parse(`
		import { Component, PropTypes } from 'react';
		export default class Cmpnt extends Component {
			${methods.join('\n')}
			render() {
			}
		}
	`);
	return shallow(<MethodsRenderer methods={parsed.methods} />);
}

test('should render public method', () => {
	const actual = render(['/**\n * Public\n * @public\n */\nmethod() {}']);

	expect(actual.node, 'to contain',
		<tr>
			<td><Code>method()</Code></td>
			<td></td>
			<td><Group><Markdown text="Public" /></Group></td>
		</tr>
	);
});

test('should render parameters', () => {
	const actual = render(['/**\n * Public\n * @public\n * @param {Number} value - Description\n */\nmethod(value) {}']);

	expect(actual.node, 'to contain',
		<tr>
			<td><Code>method()</Code></td>
			<td>
				<div>
					<Code>value</Code>: <Code>Number</Code> — <Markdown text="Description" />
				</div>
			</td>
			<td><Group><Markdown text="Public" /></Group></td>
		</tr>
	);
});

test('should render returns', () => {
	const actual = render(['/**\n * @public\n * @returns {Number} - Description\n */\nmethod() {}']);

	expect(actual.node, 'to contain',
		<tr>
			<td><Code>method()</Code></td>
			<td></td>
			<td><Group /><span>Returns <Code>Number</Code> — <Markdown text="Description" /></span></td>
		</tr>
	);
});

