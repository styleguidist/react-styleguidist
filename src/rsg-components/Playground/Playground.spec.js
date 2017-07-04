import React from 'react';
import PropTypes from 'prop-types';
import Playground from './Playground';
import '../../styles/setupjss';
import slots, { EXAMPLE_TAB_CODE_EDITOR } from '../slots';
import { PlaygroundRenderer } from './PlaygroundRenderer';

const code = '<button>OK</button>';
const newCode = '<button>Not OK</button>';
const options = {
	context: {
		config: {
			showCode: false,
			highlightTheme: 'base16-light',
		},
		slots,
	},
	childContextTypes: {
		slots: PropTypes.object.isRequired,
	},
};

it('should render component renderer', () => {
	const actual = shallow(
		<Playground code={code} evalInContext={a => () => a} name="name" index={0} />,
		options
	);

	expect(actual).toMatchSnapshot();
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
			...options.context,
			config: {
				...options.context.config,
				previewDelay: 1,
			},
		},
	});

	expect(actual.state('code')).toEqual(code);

	actual.instance().handleChange(newCode);

	expect(actual.state('code')).toEqual(code);
	setTimeout(() => {
		expect(actual.state('code')).toEqual(newCode);
		done();
	}, 3);
});

it('should open a code editor', () => {
	const actual = mount(
		<Playground code={code} evalInContext={a => () => a} name="name" index={0} />,
		options
	);

	expect(actual.find('.ReactCodeMirror')).toHaveLength(0);

	actual.find(`button[name="${EXAMPLE_TAB_CODE_EDITOR}"]`).simulate('click');

	expect(actual.find('.ReactCodeMirror')).toHaveLength(1);
});

it('should not render a code editor if noEditor option passed in example settings', () => {
	const actual = mount(
		<Playground
			code={code}
			evalInContext={a => () => a}
			name="name"
			index={0}
			settings={{ noeditor: true }}
		/>,
		options
	);
	expect(actual.find(`button[name="${EXAMPLE_TAB_CODE_EDITOR}"]`)).toHaveLength(0);
});

it('should render a code editor opened by default if showCode:true option passed in example settings', () => {
	const actual = mount(
		<Playground
			code={code}
			evalInContext={a => () => a}
			name="name"
			index={0}
			settings={{ showcode: true }}
		/>,
		options
	);
	expect(actual.find('.ReactCodeMirror')).toHaveLength(1);
});

it('should render a code editor closed by default if showCode:false option passed in example settings', () => {
	const actual = mount(
		<Playground
			code={code}
			evalInContext={a => () => a}
			name="name"
			index={0}
			settings={{ showcode: false }}
		/>,
		{
			context: {
				...options.context,
				config: {
					...options.context.config,
					showCode: true,
				},
			},
		}
	);
	expect(actual.find('.ReactCodeMirror')).toHaveLength(0);
});

it('renderer should render preview', () => {
	const actual = shallow(
		<PlaygroundRenderer
			classes={{}}
			name="name"
			preview={<div>preview</div>}
			tabButtons={<div>tab buttons</div>}
			tabBody={<div>tab body</div>}
			toolbar={<div>toolbar</div>}
		/>
	);

	expect(actual).toMatchSnapshot();
});
