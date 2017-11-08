import isFinite from 'lodash/isFinite';
import {
	getInfoFromHash,
	filterComponentExamples,
	filterSectionExamples,
	filterComponentsInSectionsByExactName,
	findSection,
	processSections,
} from './utils';

/**
 * Return sections / components / examples to show on a screen according to a current route.
 *
 * Default: show all sections and components.
 * #!/Button: show only Button section or Button component
 * #!/Button/1: show only the second example (index 1) of Button component
 *
 * @param {object} allSections
 * @param {string} hash
 * @returns {object}
 */
export default function getRouteData(allSections, hash) {
	// Parse URL hash to check if the components list must be filtered
	const {
		// Name of the filtered component/section to show isolated (/#!/Button → Button)
		targetName,
		// Index of the fenced block example of the filtered component isolate (/#!/Button/1 → 1)
		targetIndex,
	} = getInfoFromHash(hash);

	// all: show all section and components (default)
	// section: show one section
	// component: show one component
	// example: show one example
	let displayMode = 'all';

	let sections = processSections(allSections);

	// Filter the requested component if required
	if (targetName) {
		const filteredComponents = filterComponentsInSectionsByExactName(sections, targetName);
		if (filteredComponents.length) {
			sections = [{ components: filteredComponents }];
			displayMode = 'component';
		} else {
			const section = findSection(sections, targetName);
			sections = section ? [section] : [];
			displayMode = 'section';
		}

		// If a single component or section is filtered and a fenced block index is specified hide all other examples
		if (isFinite(targetIndex)) {
			if (filteredComponents.length === 1) {
				filteredComponents[0] = filterComponentExamples(filteredComponents[0], targetIndex);
				displayMode = 'example';
			} else if (sections.length === 1) {
				sections[0] = filterSectionExamples(sections[0], targetIndex);
				displayMode = 'example';
			}
		}
	}

	return { sections, displayMode };
}
