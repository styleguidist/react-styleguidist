import React from 'react';
import PropTypes from 'prop-types';
import { parse, MethodDescriptor } from 'react-docgen';
import { createRenderer } from 'react-test-renderer/shallow';
import MethodsRenderer, { columns } from './MethodsRenderer';

// Test renderers with clean readable snapshot diffs
export default function ColumnsRenderer({ methods }: { methods: MethodDescriptor[] }) {
	return (
		<ul>
			{methods.map((row, rowIdx) => (
				<li key={rowIdx}>
					{columns.map((col, colIdx) => (
						<div key={colIdx}>{col.render(row)}</div>
					))}
				</li>
			))}
		</ul>
	);
}

ColumnsRenderer.propTypes = {
	methods: PropTypes.array,
};

function render(methods: string[]) {
	const parsed = parse(
		`
		import { Component } from 'react';
		export default class Cmpnt extends Component {
			${methods.join('\n')}
			render() {
			}
		}
	`,
		undefined,
		undefined,
		{ filename: '' }
	);
	const renderer = createRenderer();
	if (Array.isArray(parsed) || !parsed.methods) {
		renderer.render(<div />);
	} else {
		renderer.render(<ColumnsRenderer methods={parsed.methods} />);
	}
	return renderer.getRenderOutput();
}

describe('MethodsRenderer', () => {
	it('should render a table', () => {
		const renderer = createRenderer();
		renderer.render(
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

		expect(renderer.getRenderOutput()).toMatchSnapshot();
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
		const renderer = createRenderer();
		renderer.render(
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

		expect(renderer.getRenderOutput()).toMatchSnapshot();
	});

	it('should render deprecated JsDoc tags', () => {
		const renderer = createRenderer();
		renderer.render(
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

		expect(renderer.getRenderOutput()).toMatchSnapshot();
	});
});
