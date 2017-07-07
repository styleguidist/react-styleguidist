import isNaN from 'lodash/isNaN';
import GithubSlugger from 'github-slugger';

// Export the singleton instance of GithubSlugger
export const slugger = new GithubSlugger();

export function setSlugs(sections) {
	return sections.map(section => {
		const { name, components, sections } = section;
		if (name) {
			section.slug = slugger.slug(section.name);
		}
		if (components && components.length) {
			section.components = setSlugs(components);
		}
		if (sections && sections.length) {
			section.sections = setSlugs(sections);
		}
		return section;
	});
}

/**
 * Expose component as global variables.
 *
 * @param {Object} component
 */
export function globalizeComponent(component) {
	if (!component.name) {
		return;
	}

	global[component.name] =
		!component.props.path || component.props.path === 'default'
			? component.module.default || component.module
			: component.module[component.props.path];
}

/**
 * Do things that are hard or impossible to do in a loader.
 *
 * @param {Array} components
 * @return {Array}
 */
export function processComponents(components) {
	return components.map(component => {
		// Add .name shortcuts for names instead of .props.displayName.
		component.name = component.props.displayName;

		// Append @example doclet to all examples
		if (component.props.example) {
			component.props.examples = [...component.props.examples, ...component.props.example];
			delete component.props.example;
		}

		globalizeComponent(component);

		return component;
	});
}

/**
 * Recursively process each component in all sections.
 *
 * @param {Array} sections
 * @return {Array}
 */
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
	query = query.replace(/[^a-z0-9]/gi, '').split('').join('.*');
	return new RegExp(query, 'i');
}

/**
 * Fuzzy filters components list by component name.
 *
 * @param {array} components
 * @param {string} query
 * @return {array}
 */
export function filterComponentsByName(components, query) {
	const regExp = getFilterRegExp(query);
	return components.filter(({ name }) => regExp.test(name));
}

/**
 * Fuzzy filters sections by section or component name.
 *
 * @param {Array} sections
 * @param {string} query
 * @return {Array}
 */
export function filterSectionsByName(sections, query) {
	const regExp = getFilterRegExp(query);

	return sections
		.map(section =>
			Object.assign({}, section, {
				sections: section.sections ? filterSectionsByName(section.sections, query) : [],
				components: section.components ? filterComponentsByName(section.components, query) : [],
			})
		)
		.filter(
			section =>
				section.components.length > 0 || section.sections.length > 0 || regExp.test(section.name)
		);
}

/**
 * Filters list of components by component name.
 *
 * @param {Array} components
 * @param {string} name
 * @return {Array}
 */
export function filterComponentsByExactName(components, name) {
	return components.filter(component => component.name === name);
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
 * Recursively finds a section with a given name (exact match)
 *
 * @param  {Array}  sections
 * @param  {string} name
 * @return {object}
 */
export function findSection(sections, name) {
	const found = sections.find(section => section.name === name);
	if (found) {
		return found;
	}

	for (const section of sections) {
		if (!section.sections || section.sections.length === 0) {
			continue;
		}
		const found = findSection(section.sections, name);
		if (found) {
			return found;
		}
	}

	return undefined;
}

/**
 * Returns an object containing component/section name and, optionally, an example index
 * from hash part or page URL:
 * http://localhost:6060/#!/Button → { targetName: 'Button' }
 * http://localhost:6060/#!/Button/1 → { targetName: 'Button', targetIndex: 1 }
 *
 * @param {string} [hash]
 * @returns {object}
 */
export function getInfoFromHash(hash = window.location.hash) {
	if (hash.substr(0, 3) === '#!/') {
		const tokens = hash.substr(3).split('/');
		const index = parseInt(tokens[1], 10);
		return {
			targetName: tokens[0],
			targetIndex: isNaN(index) ? undefined : index,
		};
	}
	return {};
}

/**
 * Return a shallow copy of the given component with the examples array filtered
 * to contain only the specified index:
 * filterComponentExamples({ examples: [1,2,3], ...other }, 2) → { examples: [3], ...other }
 *
 * @param {object} component
 * @param {number} index
 * @returns {object}
 */
export function filterComponentExamples(component, index) {
	const newComponent = Object.assign({}, component);
	newComponent.props.examples = [component.props.examples[index]];
	return newComponent;
}

export function filterSectionExamples(section, index) {
	const newComponent = Object.assign({}, section);
	newComponent.content = [section.content[index]];
	return newComponent;
}

/**
 * Get component / section URL.
 *
 * @param {string} $.name Name
 * @param {string} $.slug Slug
 * @param {number} $.example Example index
 * @param {boolean} $.anchor Anchor?
 * @param {boolean} $.isolated Isolated mode?
 * @param {boolean} $.nochrome No chrome? (Can be combined with anchor or isolated)
 * @param {boolean} $.absolute Absolute URL? (Can be combined with other flags)
 * @param {object} [location] Location object (will use current page location by default)
 * @return {string}
 */
export function getUrl(
	{ name, slug, example, anchor, isolated, nochrome, absolute } = {},
	{ origin, pathname } = window.location
) {
	let url = pathname;

	if (nochrome) {
		url += '?nochrome';
	}

	if (anchor) {
		url += `#${slug}`;
	} else if (isolated || nochrome) {
		url += `#!/${name}`;
	}

	if (example) {
		url += `/${example}`;
	}

	if (absolute) {
		return origin + url;
	}

	return url;
}
