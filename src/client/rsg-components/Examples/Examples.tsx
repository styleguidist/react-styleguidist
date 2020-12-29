import React from 'react';
import PropTypes from 'prop-types';
import ExamplesRenderer from 'rsg-components/Examples/ExamplesRenderer';
import * as Rsg from '../../../typings';

export interface ExamplesRenderer {
	content: Rsg.ExamplesModule;
	componentName?: string;
	exampleMode?: string;
}

const Examples: React.FunctionComponent<ExamplesRenderer> = ({ content, componentName }) => {
	const ExampleComponent = content.default;
	return (
		<ExamplesRenderer componentName={componentName}>
			<ExampleComponent componentName={componentName} />
		</ExamplesRenderer>
	);
};

Examples.propTypes = {
	content: PropTypes.any.isRequired,
	componentName: PropTypes.string.isRequired,
	exampleMode: PropTypes.string.isRequired,
};

export default Examples;
