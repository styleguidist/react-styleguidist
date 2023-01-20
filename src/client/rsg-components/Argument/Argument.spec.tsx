import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { ArgumentRenderer, styles } from './ArgumentRenderer';

const name = 'Foo';
const type = { type: 'NameExpression', name: 'Array' };
const description = 'Converts foo to bar';
const props = {
	classes: classes(styles),
	name: 'argname',
};

it('should render argument', () => {
	const renderer = createRenderer();
	renderer.render(
		<ArgumentRenderer {...props} name={name} type={type} description={description} />
	);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('should render argument without type', () => {
	const renderer = createRenderer();
	renderer.render(<ArgumentRenderer {...props} name={name} description={description} />);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('should render optional argument', () => {
	const renderer = createRenderer();
	renderer.render(
		<ArgumentRenderer
			{...props}
			type={{ type: 'OptionalType', expression: { type: 'NameExpression', name: 'Array' } }}
			description={description}
		/>
	);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('should render default value of argument', () => {
	const renderer = createRenderer();
	renderer.render(
		<ArgumentRenderer
			{...props}
			type={{ type: 'NameExpression', name: 'String' }}
			default="bar"
			description={description}
		/>
	);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('should render default value of optional argument', () => {
	const renderer = createRenderer();
	renderer.render(
		<ArgumentRenderer
			{...props}
			type={{ type: 'OptionalType', expression: { type: 'NameExpression', name: 'Boolean' } }}
			default="true"
			description={description}
		/>
	);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('should render argument without description', () => {
	const renderer = createRenderer();
	renderer.render(<ArgumentRenderer {...props} name={name} type={type} />);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('should render return value', () => {
	const renderer = createRenderer();
	renderer.render(<ArgumentRenderer {...props} type={type} description={description} returns />);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});

it('should render with block styles', () => {
	const renderer = createRenderer();
	renderer.render(<ArgumentRenderer {...props} block />);

	expect(renderer.getRenderOutput()).toMatchSnapshot();
});
