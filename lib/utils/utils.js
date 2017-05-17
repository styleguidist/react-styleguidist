'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.slugger = undefined;
exports.setSlugs = setSlugs;
exports.globalizeComponent = globalizeComponent;
exports.processComponents = processComponents;
exports.processSections = processSections;
exports.getFilterRegExp = getFilterRegExp;
exports.filterComponentsByName = filterComponentsByName;
exports.filterSectionsByName = filterSectionsByName;
exports.filterComponentsByExactName = filterComponentsByExactName;
exports.filterComponentsInSectionsByExactName = filterComponentsInSectionsByExactName;
exports.filterSections = filterSections;
exports.getInfoFromHash = getInfoFromHash;
exports.filterComponentExamples = filterComponentExamples;

var _isNaN = require('lodash/isNaN');

var _isNaN2 = _interopRequireDefault(_isNaN);

var _githubSlugger = require('github-slugger');

var _githubSlugger2 = _interopRequireDefault(_githubSlugger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Export the singleton instance of GithubSlugger
var slugger = exports.slugger = new _githubSlugger2.default();

function setSlugs(sections) {
	return sections.map(function (section) {
		var name = section.name,
		    components = section.components,
		    sections = section.sections;

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
function globalizeComponent(component) {
	if (!component.name) {
		return;
	}

	global[component.name] = !component.props.path || component.props.path === 'default' ? component.module.default || component.module : component.module[component.props.path];
}

/**
 * Do things that are hard or impossible to do in a loader.
 *
 * @param {Array} components
 * @return {Array}
 */
function processComponents(components) {
	return components.map(function (component) {
		// Add .name shortcuts for names instead of .props.displayName.
		component.name = component.props.displayName;

		// Append @example doclet to all examples
		if (component.props.example) {
			component.props.examples = [].concat(_toConsumableArray(component.props.examples), _toConsumableArray(component.props.example));
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
function processSections(sections) {
	return sections.map(function (section) {
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
function getFilterRegExp(query) {
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
function filterComponentsByName(components, query) {
	var regExp = getFilterRegExp(query);
	return components.filter(function (_ref) {
		var name = _ref.name;
		return regExp.test(name);
	});
}

/**
 * Fuzzy filters sections by section or component name.
 *
 * @param {Array} sections
 * @param {string} query
 * @return {Array}
 */
function filterSectionsByName(sections, query) {
	var regExp = getFilterRegExp(query);

	return sections.map(function (section) {
		return Object.assign({}, section, {
			sections: section.sections ? filterSectionsByName(section.sections, query) : [],
			components: section.components ? filterComponentsByName(section.components, query) : []
		});
	}).filter(function (section) {
		return section.components.length > 0 || section.sections.length > 0 || regExp.test(section.name);
	});
}

/**
 * Filters list of components by component name.
 *
 * @param {Array} components
 * @param {string} name
 * @return {Array}
 */
function filterComponentsByExactName(components, name) {
	return components.filter(function (component) {
		return component.name === name;
	});
}

/**
 * Recursively filters all components in all sections by component name.
 *
 * @param {object} sections
 * @param {string} name
 * @return {Array}
 */
function filterComponentsInSectionsByExactName(sections, name) {
	var components = [];
	sections.forEach(function (section) {
		if (section.components) {
			components.push.apply(components, _toConsumableArray(filterComponentsByExactName(section.components, name)));
		}
		if (section.sections) {
			components.push.apply(components, _toConsumableArray(filterComponentsInSectionsByExactName(section.sections, name)));
		}
	});
	return components;
}

/**
 * Filters the sections to find the one with the matching name
 * @param  {Array}  sections The styleguide sections
 * @param  {string} name     The name to match
 * @return {object}          The section found
 */
function filterSections(sections, name) {
	return sections.find(function (section) {
		return section.name === name;
	});
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
function getInfoFromHash() {
	var hash = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.hash;

	if (hash.substr(0, 3) === '#!/') {
		var tokens = hash.substr(3).split('/');
		var index = parseInt(tokens[1], 10);
		return {
			targetName: tokens[0],
			targetIndex: (0, _isNaN2.default)(index) ? null : index
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
function filterComponentExamples(component, index) {
	var newComponent = Object.assign({}, component);
	newComponent.props.examples = [component.props.examples[index]];
	return newComponent;
}