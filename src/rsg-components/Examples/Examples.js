import React, { PropTypes } from 'react';
import Playground from 'rsg-components/Playground';
import Markdown from 'rsg-components/Markdown';

const Examples = ({ examples }, { codeKey }) => {
	return (
		<div>
			{examples.map((example, index) => {
				switch (example.type) {
					case 'code':
						return (
							<Playground
								code={example.content}
								evalInContext={example.evalInContext}
								key={`${codeKey}/${index}`}
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
	examples: PropTypes.array.isRequired,
};
Examples.contextTypes = {
	codeKey: PropTypes.number.isRequired,
};


export default Examples;
