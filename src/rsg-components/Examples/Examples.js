import React from 'react';
import PropTypes from 'prop-types';
import Playground from 'rsg-components/Playground';
import Markdown from 'rsg-components/Markdown';
import ExamplesRenderer from 'rsg-components/Examples/ExamplesRenderer';

export default function Examples({ examples, name }, { codeRevision }) {
	return (
		<ExamplesRenderer>
			{examples.map((example, index) => {
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
}
Examples.propTypes = {
	examples: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired,
};
Examples.contextTypes = {
	codeRevision: PropTypes.number.isRequired,
};
