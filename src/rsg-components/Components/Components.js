import React from 'react';
import PropTypes from 'prop-types';
import ReactComponent from 'rsg-components/ReactComponent';
import ComponentsRenderer from 'rsg-components/Components/ComponentsRenderer';

export default function Components({ components, depth, codeSamples, propsMethods }) {
	return (
		<ComponentsRenderer>
			{components.map(component => (
				<ReactComponent
					key={component.filepath}
					component={component}
					codeSamples={codeSamples}
					propsMethods={propsMethods}
					depth={depth}
				/>
			))}
		</ComponentsRenderer>
	);
}

Components.propTypes = {
	components: PropTypes.array.isRequired,
	depth: PropTypes.number.isRequired,
	codeSamples: PropTypes.string.isRequired,
	propsMethods: PropTypes.string.isRequired,
};
