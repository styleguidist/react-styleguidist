import flatMap from 'lodash/flatMap';
import isArray from 'lodash/isArray';
import extend from 'lodash/extend';

export function setComponentsNames(components) {
	components.map((component) => {
		// Try to detect component name or fallback to file name or directory name.
		let { module } = component;
		component.name = (component.props && component.props.displayName) || (
			module.default
				? (module.default.displayName || module.default.name)
				: (module.displayName || module.name)
		) || component.nameFallbak;
	});
	return components;
}

export function globalizeComponents(components) {
	components.map((component) => {
		global[component.name] = (!component.props || !component.props.path || component.props.path === 'default')
			? (component.module.default || component.module)
			: component.module[component.props.path];
	});
}

export function promoteInlineExamples(components) {
	components.map(c => {
		if (c.props.example) {
			c.examples = (c.examples || []).concat(c.props.example);
		}
	});
	return components;
}

export function flattenChildren(components) {
	// If any of the components have multiple children, flatten them.
	return flatMap(components, c => {
		if (isArray(c.props)) {
			return c.props.map(props => extend({}, c, {props: props}));
		}
		else {
			return c;
		}
	});
}
