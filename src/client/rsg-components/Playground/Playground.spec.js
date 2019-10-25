import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Playground from './Playground';
import slots from '../slots';
import Context from '../Context';

const evalInContext = a =>
	// eslint-disable-next-line no-new-func
	new Function('require', 'const React = require("react");' + a).bind(null, require);
const code = '<button>Code: OK</button>';
const newCode = '<button>Code: Not OK</button>';
const defaultProps = {
	index: 0,
	name: 'name',
	settings: {},
	exampleMode: 'collapse',
	evalInContext,
	code,
};
const context = {
	config: {
		previewDelay: 0,
	},
	codeRevision: 0,
	slots: slots({}),
};

const Provider = props => <Context.Provider value={context} {...props} />;

it('should update code via props', () => {
	const { rerender, getByText } = render(
		<Provider>
			<Playground {...defaultProps} />
		</Provider>
	);

	expect(getByText('Code: OK')).toBeInTheDocument();

	rerender(
		<Provider>
			<Playground {...defaultProps} code={newCode} />
		</Provider>
	);

	expect(getByText('Code: Not OK')).toBeInTheDocument();
});

it('should open a code editor', () => {
	const { queryByRole, getByText } = render(
		<Provider>
			<Playground {...defaultProps} />
		</Provider>
	);

	expect(queryByRole('textbox')).not.toBeInTheDocument();

	fireEvent.click(getByText(/view code/i));

	expect(queryByRole('textbox')).toBeInTheDocument();
});

it('should not render a code editor if noeditor option passed in example settings', () => {
	const { queryByText } = render(
		<Provider>
			<Playground {...defaultProps} settings={{ noeditor: true }} />
		</Provider>
	);

	expect(queryByText(/view code/i)).not.toBeInTheDocument();
});

it('should open a code editor by default if showcode=true option passed in example settings', () => {
	const { queryByRole } = render(
		<Provider>
			<Playground {...defaultProps} settings={{ showcode: true }} />
		</Provider>
	);

	expect(queryByRole('textbox')).toBeInTheDocument();
});

it('should open a code editor by default if exampleMode="expand" option specified in style guide config', () => {
	const { queryByRole } = render(
		<Provider
			value={{
				...context,
				config: {
					...context.config,
				},
			}}
		>
			<Playground {...defaultProps} exampleMode="expand" />
		</Provider>
	);

	expect(queryByRole('textbox')).toBeInTheDocument();
});

it('showcode option in example settings should overwrite style guide config option', () => {
	const { queryByRole } = render(
		<Provider
			value={{
				...context,
				config: {
					...context.config,
				},
			}}
		>
			<Playground {...defaultProps} exampleMode="expand" settings={{ showcode: false }} />
		</Provider>
	);

	expect(queryByRole('textbox')).not.toBeInTheDocument();
});
