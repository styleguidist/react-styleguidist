import React from 'react';
import { parse } from 'react-docgen';
import { MethodsRenderer } from './MethodsRenderer';

function render(methods) {
	const parsed = parse(`
		import { Component } from 'react';
		export default class Cmpnt extends Component {
			${methods.join('\n')}
			render() {
			}
		}
	`);
	return shallow(<MethodsRenderer methods={parsed.methods} classes={{}} />);
}

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
	const actual = render(['/**\n * @public\n * @returns {Number} - Description\n */\nmethod() {}']);

	expect(actual).toMatchSnapshot();
});

it('should render JsDoc tags', () => {
	const actual = shallow(
		<MethodsRenderer
			classes={{}}
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
		<MethodsRenderer
			classes={{}}
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
