import React from 'react';
import PropTypes from 'prop-types';
import Playground from './Playground';
import slots, { EXAMPLE_TAB_CODE_EDITOR } from '../slots';
import { PlaygroundRenderer, styles } from './PlaygroundRenderer';

const evalInContext = a =>
	new Function('require', 'const React = require("react");' + a).bind(null, require); // eslint-disable-line no-new-func
const code = '<button>OK</button>';
const newCode = '<button>Not OK</button>';
const props = {
	index: 0,
	name: 'name',
	settings: {},
	exampleMode: 'collapse',
	evalInContext,
	code,
};
const options = {
	context: {
		config: {
			previewDelay: 0,
		},
		codeRevision: 0,
		slots: slots({}),
	},
	childContextTypes: {
		slots: PropTypes.object.isRequired,
		codeRevision: PropTypes.number.isRequired,
	},
};

it('should render component renderer', () => {
	const actual = shallow(<Playground {...props} />, options);

	expect(actual).toMatchSnapshot();
});

it('should update code via props', () => {
	const actual = shallow(<Playground {...props} />, options);

	expect(actual.state('code')).toEqual(code);

	actual.setProps({
		code: newCode,
	});

	expect(actual.state('code')).toEqual(newCode);
});

it('should update code with debounce', done => {
	const actual = shallow(<Playground {...props} />, {
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

it('should open a code editor', done => {
	const actual = mount(<Playground {...props} />, options);

	expect(actual.find('textarea')).toHaveLength(0);

	actual.find(`button[name="${EXAMPLE_TAB_CODE_EDITOR}"]`).simulate('click');

	// setTimeout(() => {
	actual.update();
	expect(actual.find('textarea')).toHaveLength(1);
	done();
	// }, 1);
});

it('should not render a code editor if noeditor option passed in example settings', () => {
	const actual = mount(<Playground {...props} settings={{ noeditor: true }} />, options);
	expect(actual.find(`button[name="${EXAMPLE_TAB_CODE_EDITOR}"]`)).toHaveLength(0);
});

it('should open a code editor by default if showcode=true option passed in example settings', () => {
	const actual = mount(<Playground {...props} settings={{ showcode: true }} />, options);
	expect(actual.find('textarea')).toHaveLength(1);
});

it('should open a code editor by default if exampleMode="expand" option specified in style guide config', () => {
	const actual = mount(<Playground {...props} exampleMode="expand" />, {
		context: {
			...options.context,
			config: {
				...options.context.config,
			},
		},
		childContextTypes: options.childContextTypes,
	});
	expect(actual.find('textarea')).toHaveLength(1);
});

it('showcode option in example settings should overwrite style guide config option', () => {
	const actual = mount(
		<Playground {...props} exampleMode="expand" settings={{ showcode: false }} />,
		{
			context: {
				...options.context,
				config: {
					...options.context.config,
				},
			},
			childContextTypes: options.childContextTypes,
		}
	);
	expect(actual.find('textarea')).toHaveLength(0);
});

it('renderer should render preview', () => {
	const actual = shallow(
		<PlaygroundRenderer
			classes={classes(styles)}
			name="name"
			preview={<div>preview</div>}
			previewProps={{ className: 'pizza', title: 'salami' }}
			tabButtons={<div>tab buttons</div>}
			tabBody={<div>tab body</div>}
			toolbar={<div>toolbar</div>}
		/>
	);

	expect(actual).toMatchSnapshot();
});
