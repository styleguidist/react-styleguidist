import flatMap from 'lodash/flatMap';
import isArray from 'lodash/isArray';
import extend from 'lodash/extend';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';

const upperFirstCamelCase = (name) => {
	var tmp = camelCase(name)
	return upperFirst(tmp);
}

export function setComponentsNames(components) {
	components.map((component) => {
		// Try to detect component name or fallback to file name or directory name.
		let { module } = component;
		component.name = (component.props && component.props.displayName) || (module && (
			module.default
				? (module.default.displayName || module.default.name)
				: (module.displayName || module.name)
		)) || upperFirstCamelCase(component.nameFallback);
	});
	return components;
}

export function globalizeComponents(components) {
	components.map((component) => {
		if (typeof component.module === 'undefined') {
			return;
		}

		global[component.name] = (!component.props || !component.props.path || component.props.path === 'default')
			? (component.module.default || component.module)
			: component.module[component.props.path];
	});
}

export function promoteInlineExamples(components) {
	components.map(c => {
		if (c.props && c.props.example) {
			c.examples = (c.examples || []).concat(c.props.example);
		}
	});
	return components;
}

export function flattenChildren(components) {
	// If any of the components have multiple children, flatten them.
	return flatMap(components, component => {
		if (isArray(component.props)) {
			return component.props.map(props => extend({}, component, { props }));
		}
		return component;
	});
}

/**
 * Fuzzy filters components list by component name.
 *
 * @param {string} query
 * @return {RegExp}
 */
export function getFilterRegExp(query) {
	query = query
		.replace(/[^a-z0-9]/gi, '')
		.split('')
		.join('.*')
	;
	return new RegExp(query, 'gi');
}

/**
 * Fuzzy filters components list by component name.
 *
 * @param {array} components
 * @param {string} query
 * @return {array}
 */
export function filterComponentsByName(components, query) {
	return components.filter(({ name }) => name.match(getFilterRegExp(query)));
}
