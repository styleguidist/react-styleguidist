import flatMap from 'lodash/flatMap';
import isArray from 'lodash/isArray';
import extend from 'lodash/extend';
import isNaN from 'lodash/isNaN';

export function setComponentsNames(components) {
	components.map((component) => {
		// Try to detect component name or fallback to file name or directory name.
		const { module } = component;
		component.name = (component.props && component.props.displayName) || (
			module.default
				? (module.default.displayName || module.default.name)
				: (module.displayName || module.name)
		) || component.nameFallback;
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
	return flatMap(components, component => {
		if (isArray(component.props)) {
			return component.props.map(props => extend({}, component, { props }));
		}
		return component;
	});
}

export function processComponents(components) {
	components = flattenChildren(components);
	components = promoteInlineExamples(components);
	components = setComponentsNames(components);
	globalizeComponents(components);
	return components;
}

export function processSections(sections) {
	return sections.map(section => {
		section.components = processComponents(section.components || []);
		section.sections = processSections(section.sections || []);
		return section;
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

/**
 * Filters list of components by component name.
 *
 * @param {Array} componens
 * @param {string} name
 * @return {Array}
 */
export function filterComponentsByExactName(componens, name) {
	return componens.filter(component => component.name === name);
}

/**
 * Recursively filters all components in all sections by component name.
 *
 * @param {object} sections
 * @param {string} name
 * @return {Array}
 */
export function filterComponentsInSectionsByExactName(sections, name) {
	const components = [];
	sections.forEach(section => {
		if (section.components) {
			components.push(...filterComponentsByExactName(section.components, name));
		}
		if (section.sections) {
			components.push(...filterComponentsInSectionsByExactName(section.sections, name));
		}
	});
	return components;
}

/**
 * Returns an object containing component name and, optionally, an example index
 * from hash part or page URL:
 * http://localhost:3000/#!/Button → { targetComponentName: 'Button' }
 * http://localhost:3000/#!/Button/1 → { targetComponentName: 'Button', targetComponentIndex: 1 }
 *
 * @param {string} [hash]
 * @returns {object}
 */
export function getComponentNameFromHash(hash = window.location.hash) {
	if (hash.substr(0, 3) === '#!/') {
		const tokens = hash.substr(3).split('/');
		const index = parseInt(tokens[1], 10);
		return {
			targetComponentName: tokens[0],
			targetComponentIndex: isNaN(index) ? null : index,
		};
	}
	return {};
}

/**
 * Reurn a shallow copy of the given component with the examples array filtered
 * to contain only the specified index:
 * filterComponentExamples({ examples: [1,2,3], ...other }, 2) → { examples: [3], ...other }
 *
 * @param {object} component
 * @param {number} index
 * @returns {object}
 */
export function filterComponentExamples(component, index) {
	const newComponent = Object.assign({}, component);
	newComponent.examples = [component.examples[index]];
	return newComponent;
}
