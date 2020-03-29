import React from 'react';
import PropTypes from 'prop-types';
import Playground from 'rsg-components/Playground';
import Markdown from 'rsg-components/Markdown';
import ExamplesRenderer from 'rsg-components/Examples/ExamplesRenderer';
import PlaygroundError from 'rsg-components/PlaygroundError';
import * as Rsg from '../../../typings';

export interface ExamplesRenderer {
	examples: Rsg.Example[];
	name?: string;
	filepath: string;
	exampleMode?: string;
}

const Examples: React.FunctionComponent<ExamplesRenderer> = ({ examples, name, exampleMode }) => {
	return (
		<ExamplesRenderer name={name}>
			{examples.map((example, index) => {
				switch (example.type) {
					case 'code':
						return (
							<Playground
								key={index}
								code={example.content}
								evalInContext={example.evalInContext}
								name={name}
								index={index}
								settings={example.settings}
								exampleMode={exampleMode}
							/>
						);
					case 'markdown':
						return <Markdown key={index} text={example.content} />;
					case 'error':
						return <PlaygroundError key={index} message={example.content} />;
					default:
						return null;
				}
			})}
		</ExamplesRenderer>
	);
};

Examples.propTypes = {
	examples: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired,
	filepath: PropTypes.string.isRequired,
	exampleMode: PropTypes.string.isRequired,
};

export default Examples;
