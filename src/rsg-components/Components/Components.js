import React from 'react';
import PropTypes from 'prop-types';
import ReactComponent from 'rsg-components/ReactComponent';
import ComponentsRenderer from 'rsg-components/Components/ComponentsRenderer';

export default function Components({ components, depth }) {

  // filter out components with static styleguide false
  components = components.filter((comp) => {
    if (comp.module.default) {
      return comp.module.default.styleguide !== false;
    }
    const mod = Object.keys(comp.module);
    return comp.module[mod[0]].styleguide !== false;
  });

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
