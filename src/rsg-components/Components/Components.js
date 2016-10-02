import React, { PropTypes } from 'react';
import ReactComponent from 'rsg-components/ReactComponent';
import Sections from 'rsg-components/Sections';
import ComponentsRenderer from 'rsg-components/Components/ComponentsRenderer';

export default function Components({
	components,
	sections,
	sidebar,
}) {
	const componentsJsx = components.map(component => (
		<ReactComponent
			key={component.filepath}
			component={component}
			sidebar={sidebar}
		/>
	));

	const sectionsJsx = (
		<Sections
			sections={sections}
			sidebar={sidebar}
		/>
	);

	return (
		<ComponentsRenderer
			components={componentsJsx}
			sections={sectionsJsx}
		/>
	);
}

Components.propTypes = {
	components: PropTypes.array.isRequired,
	sections: PropTypes.array.isRequired,
	sidebar: PropTypes.bool,
};
