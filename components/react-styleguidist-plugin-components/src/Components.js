import React from 'react';
import PropTypes from 'prop-types';
import ReactComponent from 'react-styleguidist-plugin-reactcomponent';
import ComponentsRenderer from './ComponentsRenderer';

export default function Components({ components, depth }) {
	return (
		<ComponentsRenderer>
			{components.map(component => (
				<ReactComponent key={component.filepath} component={component} depth={depth} />
			))}
		</ComponentsRenderer>
	);
}

Components.propTypes = {
	components: PropTypes.array.isRequired,
	depth: PropTypes.number.isRequired,
};
