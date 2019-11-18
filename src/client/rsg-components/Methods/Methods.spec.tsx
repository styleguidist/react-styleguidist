import React from 'react';
import PropTypes from 'prop-types';
import { parse } from 'react-docgen';
import { shallow } from 'enzyme';
import MethodsRenderer, { columns, MethodProp } from './MethodsRenderer';

// Test renderers with clean readable snapshot diffs
export default function ColumnsRenderer({ methods }: { methods: MethodProp[] }) {
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
		{ filename: '' } as any
	);
	if (Array.isArray(parsed)) {
		return shallow(<div />);
	}
	// the types of react-docgen are poor to say the least
	return shallow(<ColumnsRenderer methods={(parsed as any).methods} />);
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
