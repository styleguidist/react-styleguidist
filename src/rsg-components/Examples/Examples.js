/* eslint
  import/no-extraneous-dependencies: off,
  import/no-unresolved: off,
  import/extensions: off,
  react/forbid-prop-types: off,
  react/jsx-filename-extension: off
*/
import React, { PropTypes } from 'react';
import Playground from 'rsg-components/Playground';
import Markdown from 'rsg-components/Markdown';

const Examples = ({ examples, name, props }, { codeKey }) => (
	<div>
		{examples.map((example, index) => {
			switch (example.type) {
				case 'code':
					return (
						<Playground
							code={example.content}
							evalInContext={example.evalInContext}
							key={`${codeKey}/${index}`}
							name={name}
							index={index}
							props={props}
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

Examples.propTypes = {
	examples: PropTypes.array.isRequired,
	name: PropTypes.string,
	props: PropTypes.object,
};
Examples.contextTypes = {
	codeKey: PropTypes.number.isRequired,
};


export default Examples;
