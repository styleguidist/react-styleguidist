import React from 'react';
import PropTypes from 'prop-types';
import ExamplesRenderer from 'rsg-components/Examples/ExamplesRenderer';
import { useStyleGuideContext } from 'rsg-components/Context';
import * as Rsg from '../../../typings';

export interface ExamplesRenderer {
	examples: Rsg.Example[];
	name?: string;
	exampleMode?: string;
}

const Examples: React.FunctionComponent<ExamplesRenderer> = ({ examples, name, exampleMode }) => {
	const { codeRevision } = useStyleGuideContext();

	// TODO: Do we still need a loop here?

	return (
		<ExamplesRenderer name={name}>
			{examples.map((example, index) => {
				const ExampleComponent = example.default;
				return (
					<ExampleComponent
						key={index}
						componentName={name}
						exampleIndex={index}
						exampleMode={exampleMode}
					/>
				);
			})}
		</ExamplesRenderer>
	);
};

Examples.propTypes = {
	examples: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired,
	exampleMode: PropTypes.string.isRequired,
};

export default Examples;
