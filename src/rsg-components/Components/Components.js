import React from 'react';
import PropTypes from 'prop-types';
import ReactComponent from 'rsg-components/ReactComponent';
import ComponentsRenderer from 'rsg-components/Components/ComponentsRenderer';

export default function Components({ components, depth, exampleModes, usageModes }) {
	return (
		<ComponentsRenderer>
			{components.map(component => (
				<ReactComponent
					key={component.filepath}
					component={component}
					exampleModes={exampleModes}
					usageModes={usageModes}
					depth={depth}
				/>
			))}
		</ComponentsRenderer>
	);
}

Components.propTypes = {
	components: PropTypes.array.isRequired,
	depth: PropTypes.number.isRequired,
	exampleModes: PropTypes.string.isRequired,
	usageModes: PropTypes.string.isRequired,
};
