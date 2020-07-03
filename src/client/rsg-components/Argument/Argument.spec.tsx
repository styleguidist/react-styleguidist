import React from 'react';
import { shallow } from 'enzyme';
import { ArgumentRenderer, styles } from './ArgumentRenderer';

const name = 'Foo';
const type = {type: 'NameExpression', name: 'Array'};
const description = 'Converts foo to bar';
const props = {
	classes: classes(styles),
	name: 'argname',
};

it('should render argument', () => {
	const actual = shallow(
		<ArgumentRenderer {...props} name={name} type={type} description={description} />
	);

	expect(actual).toMatchSnapshot();
});

it('should render argument without type', () => {
	const actual = shallow(<ArgumentRenderer {...props} name={name} description={description} />);

	expect(actual).toMatchSnapshot();
});

it('should render optional argument', () => {
	const actual = shallow(
		<ArgumentRenderer
			{...props}
			type={{ type: 'OptionalType', expression: {type: 'NameExpression', name: 'Array'} }}
			description={description}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('should render default value of argument', () => {
	const actual = shallow(
		<ArgumentRenderer
			{...props}
			type={{type: 'NameExpression', name: 'String'}}
			default="bar"
			description={description}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('should render default value of optional argument', () => {
	const actual = shallow(
		<ArgumentRenderer
			{...props}
			type={{ type: 'OptionalType', expression: {type: 'NameExpression', name: 'Boolean'} }}
			default="true"
			description={description}
		/>
	);

	expect(actual).toMatchSnapshot();
});

it('should render argument without description', () => {
	const actual = shallow(<ArgumentRenderer {...props} name={name} type={type} />);

	expect(actual).toMatchSnapshot();
});

it('should render return value', () => {
	const actual = shallow(
		<ArgumentRenderer {...props} type={type} description={description} returns />
	);

	expect(actual).toMatchSnapshot();
});

it('should render with block styles', () => {
	const actual = shallow(<ArgumentRenderer {...props} block />);

	expect(actual).toMatchSnapshot();
});
