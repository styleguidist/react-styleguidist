import React from 'react';
import Playground from './Playground';
import slots, { EXAMPLE_TAB_CODE_EDITOR } from '../slots';
import { PlaygroundRenderer, styles } from './PlaygroundRenderer';
import { Provider } from '../../provider';

const evalInContext = a =>
	new Function('require', 'const React = require("react");' + a).bind(null, require); // eslint-disable-line no-new-func
const reactCodeMirrorSelector = '.react-codemirror2';
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
const context = {
	config: {
		highlightTheme: 'base16-light',
	},
	codeRevision: 0,
	slots: slots({}),
};

it('should render component renderer', () => {
	const actual = shallow(
		<Provider {...context}>
			<Playground {...props} />
		</Provider>
	);

	expect(actual).toMatchSnapshot();
});

it('should update code via props', () => {
	const actual = shallow(
		<Provider {...context}>
			<Playground {...props} />
		</Provider>
	);

	expect(actual.state('code')).toEqual(code);

	actual.setProps({
		code: newCode,
	});

	expect(actual.state('code')).toEqual(newCode);
});

it('should update code with debounce', done => {
	const actual = shallow(
		<Provider
			{...context}
			config={{
				...context.config,
				previewDelay: 1,
			}}
		>
			<Playground {...props} />
		</Provider>
	);

	expect(actual.state('code')).toEqual(code);

	actual.instance().handleChange(newCode);

	expect(actual.state('code')).toEqual(code);
	setTimeout(() => {
		expect(actual.state('code')).toEqual(newCode);
		done();
	}, 3);
});

it('should open a code editor', done => {
	const actual = mount(
		<Provider {...context}>
			<Playground {...props} />
		</Provider>
	);

	expect(actual.find(reactCodeMirrorSelector)).toHaveLength(0);

	actual.find(`button[name="${EXAMPLE_TAB_CODE_EDITOR}"]`).simulate('click');

	setTimeout(() => {
		actual.update();
		expect(actual.find(reactCodeMirrorSelector)).toHaveLength(1);
		done();
	}, 1);
});

it('should not render a code editor if noeditor option passed in example settings', () => {
	const actual = mount(
		<Provider {...context}>
			<Playground {...props} settings={{ noeditor: true }} />
		</Provider>
	);
	expect(actual.find(`button[name="${EXAMPLE_TAB_CODE_EDITOR}"]`)).toHaveLength(0);
});

it('should open a code editor by default if showcode=true option passed in example settings', () => {
	const actual = mount(
		<Provider {...context}>
			<Playground {...props} settings={{ showcode: true }} />
		</Provider>
	);
	expect(actual.text()).toMatch('Loading');
});

it('should open a code editor by default if exampleMode="expand" option specified in style guide config', () => {
	const actual = mount(
		<Provider {...context}>
			<Playground {...props} exampleMode="expand" />
		</Provider>
	);
	expect(actual.text()).toMatch('Loading');
});

it('showcode option in example settings should overwrite style guide config option', () => {
	const actual = mount(
		<Provider {...context}>
			<Playground {...props} exampleMode="expand" settings={{ showcode: false }} />
		</Provider>
	);
	expect(actual.text()).not.toMatch('Loading');
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
