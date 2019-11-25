import React from 'react';
import PropTypes from 'prop-types';
import Playground from 'rsg-components/Playground';
import Markdown from 'rsg-components/Markdown';
import ExamplesRenderer from 'rsg-components/Examples/ExamplesRenderer';
import { useStyleGuideContext } from 'rsg-components/Context';

interface ExamplesRenderer {
	examples: Rsg.Example[];
	name?: string;
	exampleMode?: string;
}

function isTypedExample(ex: any): ex is Rsg.CodeExample | Rsg.MarkdownExample {
	return !!ex.type;
}

const Examples: React.FunctionComponent<ExamplesRenderer> = ({ examples, name, exampleMode }) => {
	const { codeRevision } = useStyleGuideContext();
	return (
		<ExamplesRenderer name={name}>
			{examples.map((example, index) => {
				if (!isTypedExample(example)) {
					return null;
				}
				switch (example.type) {
					case 'code':
						return (
							<Playground
								code={example.content}
								evalInContext={example.evalInContext}
								key={`${codeRevision}/${index}`}
								name={name}
								index={index}
								settings={example.settings}
								exampleMode={exampleMode}
							/>
						);
					case 'markdown':
						return <Markdown text={example.content} key={index} />;
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
	exampleMode: PropTypes.string.isRequired,
};

export default Examples;
