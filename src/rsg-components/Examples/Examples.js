import React, { PropTypes } from 'react';
import Playground from 'rsg-components/Playground';
import Markdown from 'rsg-components/Markdown';

export default function Examples({ examples, name }, { codeKey }) {
	return (
		<div>
			{Array.isArray(examples) && examples.map((example, index) => {
				switch (example.type) {
					case 'code':
						return (
							<Playground
								code={example.content}
								evalInContext={example.evalInContext}
								key={`${codeKey}/${index}`}
								name={name}
								index={index}
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
}
Examples.propTypes = {
	examples: PropTypes.array.isRequired,
	name: PropTypes.string,
};
Examples.contextTypes = {
	codeKey: PropTypes.number.isRequired,
};
