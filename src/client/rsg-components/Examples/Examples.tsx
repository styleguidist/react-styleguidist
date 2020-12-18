import React from 'react';
import PropTypes from 'prop-types';
import ExamplesRenderer from 'rsg-components/Examples/ExamplesRenderer';
import * as Rsg from '../../../typings';

export interface ExamplesRenderer {
	content: Rsg.ExamplesModule;
	name?: string;
	exampleMode?: string;
}

const Examples: React.FunctionComponent<ExamplesRenderer> = ({ content, name, exampleMode }) => {
	const ExampleComponent = content.default;

	// TODO: These props for ExampleComponent won't work
	return (
		<ExamplesRenderer name={name}>
			<ExampleComponent componentName={name} exampleMode={exampleMode} />
		</ExamplesRenderer>
	);
};

Examples.propTypes = {
	content: PropTypes.any.isRequired,
	name: PropTypes.string.isRequired,
	exampleMode: PropTypes.string.isRequired,
};

export default Examples;
