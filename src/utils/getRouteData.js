import isFinite from 'lodash/isFinite';
import filterComponentExamples from './filterComponentExamples';
import filterComponentsInSectionsByExactName from './filterComponentsInSectionsByExactName';
import filterSectionExamples from './filterSectionExamples';
import findSection from './findSection';
import getInfoFromHash from './getInfoFromHash';
import { DisplayModes } from '../consts';

/**
 * Return sections / components / examples to show on a screen according to a current route.
 *
 * Default: show all sections and components.
 * #!/Button: show only Button section or Button component
 * #!/Button/1: show only the second example (index 1) of Button component
 *
 * @param {object} sections
 * @param {string} hash
 * @param {boolean} pagePerSection
 * @returns {object}
 */
export default function getRouteData(sections, hash, pagePerSection) {
	// Parse URL hash to check if the components list must be filtered
	const infoFromHash = getInfoFromHash(hash, pagePerSection);

	// Name of the filtered component/section to show isolated (/#!/Button → Button)
	let { targetName, hashArray } = infoFromHash;

	const {
		// Index of the fenced block example of the filtered component isolate (/#!/Button/1 → 1)
		targetIndex,
		isolate,
	} = infoFromHash;

	let displayMode = isolate ? DisplayModes.example : DisplayModes.all;

	if (pagePerSection && !targetName && sections[0]) {
		/** For default takes the first section when pagePerSection enabled */
		targetName = sections[0].name;
		hashArray = [targetName];
	}

	if (targetName) {
		let filteredSections;

		if (pagePerSection) {
			// Try to filter each section for depth of each hash ["Documentation", "Files", "Button"]
			// When sectionDepth is major of 0, their children should be filtered
			hashArray.forEach((hashName, index) => {
				// Filter the requested component
				filteredSections = filterComponentsInSectionsByExactName(sections, hashName, isolate);
				if (filteredSections.length) {
					sections = filteredSections;
				} else {
					let section = findSection(sections, hashName);
					if (section) {
						const isLastHashName = !hashArray[index + 1];
						const shouldFilterTheirChildren = section.sectionDepth > 0 && isLastHashName;

						if (shouldFilterTheirChildren) {
							section = {
								...section,
								sections: [],
								components: [],
							};
						}
						sections = [section];
					} else {
						sections = [];
					}
				}
			});
			if (!sections.length) {
				displayMode = DisplayModes.notFound;
			}
			// The targetName takes the last of hashArray
			targetName = hashArray[hashArray.length - 1];
		} else {
			// Filter the requested component if required
			filteredSections = filterComponentsInSectionsByExactName(sections, targetName, true);
			if (filteredSections.length) {
				sections = filteredSections;
				displayMode = DisplayModes.component;
			} else {
				const section = findSection(sections, targetName);
				sections = section ? [section] : [];
				displayMode = DisplayModes.section;
			}
		}

		// If a single component or section is filtered and a fenced block index is specified hide all other examples
		if (isFinite(targetIndex)) {
			if (filteredSections.length === 1) {
				const filteredComponents = filteredSections[0].components;
				sections = [
					{
						...filteredSections[0],
						components: [filterComponentExamples(filteredComponents[0], targetIndex)],
					},
				];
				displayMode = DisplayModes.example;
			} else if (sections.length === 1) {
				sections = [filterSectionExamples(sections[0], targetIndex)];
				displayMode = DisplayModes.example;
			}
		}
	}

	return { sections, displayMode };
}
