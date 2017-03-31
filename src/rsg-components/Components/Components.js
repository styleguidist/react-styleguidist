import React, { PropTypes } from 'react';
import ReactComponent from 'rsg-components/ReactComponent';
import ComponentsRenderer from 'rsg-components/Components/ComponentsRenderer';

export default function Components({ components }) {
	return (
		<ComponentsRenderer>
			{
				components.map(component => (
					<ReactComponent
						key={component.filepath}
						component={component}
					/>
				))
			}
		</ComponentsRenderer>
	);
}

Components.propTypes = {
	components: PropTypes.array.isRequired,
};
