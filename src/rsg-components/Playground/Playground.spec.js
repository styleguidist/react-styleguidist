import React from 'react';
import Playground from './Playground';
import '../../styles/setupjss';
import { PlaygroundRenderer } from './PlaygroundRenderer';

const code = '<button>OK</button>';
const newCode = '<button>Not OK</button>';
const options = {
	context: {
		config: {
			showCode: false,
			highlightTheme: 'base16-light',
		},
	},
};

it('should render component renderer', () => {
	const actual = shallow(
		<Playground code={code} evalInContext={a => () => a} name="name" index={0} />,
		options
	);

	expect(actual).toMatchSnapshot();
});

it('should update code', () => {
	const actual = shallow(
		<Playground code={code} evalInContext={a => () => a} name="name" index={0} />,
		options
	);

	expect(actual.prop('code')).toEqual(code);

	actual.instance().handleChange(newCode);

	expect(actual.prop('code')).toEqual(newCode);
});

it('should update code via props', () => {
	const actual = shallow(
		<Playground code={code} evalInContext={a => () => a} name="name" index={0} />,
		options
	);

	expect(actual.state('code')).toEqual(code);

	actual.setProps({
		code: newCode,
	});

	expect(actual.state('code')).toEqual(newCode);
});

it('should update code with debounce', done => {
	const actual = shallow(<Playground code={code} evalInContext={a => a} name="name" index={0} />, {
		context: {
			config: {
				...options.context.config,
				previewDelay: 1,
			},
		},
	});

	expect(actual.prop('code')).toEqual(code);

	actual.instance().handleChange(newCode);

	expect(actual.prop('code')).toEqual(code);
	setTimeout(() => {
		expect(actual.prop('code')).toEqual(newCode);
		done();
	}, 5);
});

it('should open a code editor', () => {
	const actual = mount(
		<Playground code={code} evalInContext={a => () => a} name="name" index={0} />,
		options
	);

	expect(actual.find('.ReactCodeMirror')).toHaveLength(0);

	actual.find('button').simulate('click');

	expect(actual.find('.ReactCodeMirror')).toHaveLength(1);
});

it('renderer should render preview', () => {
	const actual = shallow(
		<PlaygroundRenderer
			classes={{}}
			code={code}
			showCode={false}
			evalInContext={a => () => a}
			name="name"
			index={0}
			onChange={() => {}}
			onCodeToggle={() => {}}
		/>
	);

	expect(actual).toMatchSnapshot();
});
