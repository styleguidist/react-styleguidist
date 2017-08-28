import React from 'react';
import { parse } from 'react-docgen';
import MethodsRenderer, { columns } from './MethodsRenderer';

// Test renderers with clean readable snapshot diffs
// eslint-disable-next-line react/prop-types
export default function ColumnsRenderer({ methods }) {
	return (
		<ul>
			{methods.map((row, rowIdx) => (
				<li key={rowIdx}>
					{columns.map(({ render }, colIdx) => <div key={colIdx}>{render(row)}</div>)}
				</li>
			))}
		</ul>
	);
}

function render(methods) {
	const parsed = parse(`
		import { Component } from 'react';
		export default class Cmpnt extends Component {
			${methods.join('\n')}
			render() {
			}
		}
	`);
	return shallow(<ColumnsRenderer methods={parsed.methods} />);
}

describe('MethodsRenderer', () => {
	it('should render a table', () => {
		const actual = shallow(
			<MethodsRenderer
				methods={[
					{
						name: 'method',
						modifiers: [],
						params: [],
						description: 'Public',
					},
				]}
			/>
		);

		expect(actual).toMatchSnapshot();
	});
});

describe('PropsRenderer', () => {
	it('should render public method', () => {
		const actual = render(['/**\n * Public\n * @public\n */\nmethod() {}']);

		expect(actual).toMatchSnapshot();
	});

	it('should render parameters', () => {
		const actual = render([
			'/**\n * Public\n * @public\n * @param {Number} value - Description\n */\nmethod(value) {}',
		]);

		expect(actual).toMatchSnapshot();
	});

	it('should render returns', () => {
		const actual = render([
			'/**\n * @public\n * @returns {Number} - Description\n */\nmethod() {}',
		]);

		expect(actual).toMatchSnapshot();
	});

	it('should render JsDoc tags', () => {
		const actual = shallow(
			<ColumnsRenderer
				methods={[
					{
						name: 'Foo',
						tags: {
							since: [
								{
									title: 'since',
									description: '1.0.0',
								},
							],
						},
					},
				]}
			/>
		);

		expect(actual).toMatchSnapshot();
	});

	it('should render deprecated JsDoc tags', () => {
		const actual = shallow(
			<ColumnsRenderer
				methods={[
					{
						name: 'Foo',
						tags: {
							deprecated: [
								{
									title: 'description',
									description: 'Use *another* method',
								},
							],
						},
					},
				]}
			/>
		);

		expect(actual).toMatchSnapshot();
	});
});
