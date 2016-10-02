import React, { PropTypes } from 'react';
import Playground from 'rsg-components/Playground';
import Markdown from 'rsg-components/Markdown';

const Examples = ({ highlightTheme, examples }) => {
	return (
		<div>
			{examples.map((example, index) => {
				switch (example.type) {
					case 'code':
						return (
							<Playground
								code={example.content}
								evalInContext={example.evalInContext}
								highlightTheme={highlightTheme}
								key={index}
							/>
						);
					case 'markdown':
						return (
							<Markdown
								text={example.content}
								key={index}
							/>
						);
					default:
						return null;
				}
			})}
		</div>
	);
};

Examples.propTypes = {
	highlightTheme: PropTypes.string.isRequired,
	examples: PropTypes.array.isRequired,
};

export default Examples;
