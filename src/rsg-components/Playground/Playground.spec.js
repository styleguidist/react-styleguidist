import React from 'react';
import PropTypes from 'prop-types';
import Playground from './Playground';
import '../../styles/setupjss';
import slots, { EXAMPLE_TAB_CODE_EDITOR } from '../slots';
import { PlaygroundRenderer } from './PlaygroundRenderer';

const evalInContext = a =>
	new Function('require', 'const React = require("react");' + a).bind(null, require); // eslint-disable-line no-new-func
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
		<Playground code={code} evalInContext={evalInContext} name="name" index={0} />,
		options
	);

	expect(actual).toMatchSnapshot();
});

it('should update code via props', () => {
	const actual = shallow(
		<Playground code={code} evalInContext={evalInContext} name="name" index={0} />,
		options
	);

	expect(actual.state('code')).toEqual(code);

	actual.setProps({
		code: newCode,
	});

	expect(actual.state('code')).toEqual(newCode);
});

it('should update code with debounce', done => {
	const actual = shallow(
		<Playground code={code} evalInContext={evalInContext} name="name" index={0} />,
		{
			context: {
				...options.context,
				config: {
					...options.context.config,
					previewDelay: 1,
				},
			},
		}
	);

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
		<Playground code={code} evalInContext={evalInContext} name="name" index={0} />,
		options
	);

	expect(actual.find('.ReactCodeMirror')).toHaveLength(0);

	actual.find(`button[name="${EXAMPLE_TAB_CODE_EDITOR}"]`).simulate('click');

	expect(actual.find('.ReactCodeMirror')).toHaveLength(1);
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
