import React from 'react';
import PropTypes from 'prop-types';
import ReactComponent from 'rsg-components/ReactComponent';
import ComponentsRenderer from 'rsg-components/Components/ComponentsRenderer';

export default function Components({ components, depth, exampleMode, usageMode }) {
	return (
		<ComponentsRenderer>
			{components.map(component => (
				<ReactComponent
					key={component.filepath}
					component={component}
					exampleMode={exampleMode}
					usageMode={usageMode}
					depth={depth}
				/>
			))}
		</ComponentsRenderer>
	);
}

Components.propTypes = {
	components: PropTypes.array.isRequired,
	depth: PropTypes.number.isRequired,
	exampleMode: PropTypes.string.isRequired,
	usageMode: PropTypes.string.isRequired,
};
