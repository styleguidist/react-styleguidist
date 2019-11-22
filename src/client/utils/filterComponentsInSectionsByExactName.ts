import filterComponentsByExactName from './filterComponentsByExactName';
import { RsgSection } from '../../typings/RsgSection';

/**
 * Recursively filters all components in all sections by component name.
 *
 * @param {object} sections
 * @param {string} name
 * @param {boolean} recursive
 * @return {Array}
 */
export default function filterComponentsInSectionsByExactName(
	sections: RsgSection[],
	name: string,
	recursive: boolean
): RsgSection[] {
	const filteredSections: RsgSection[] = [];
	sections.forEach(section => {
		if (section.components) {
			const filteredComponents = filterComponentsByExactName(section.components, name);
			if (filteredComponents.length) {
				filteredSections.push({
					slug: section.slug,
					exampleMode: section.exampleMode,
					usageMode: section.usageMode,
					components: filteredComponents,
				});
			}
		}
		if (section.sections && recursive) {
			filteredSections.push(
				...filterComponentsInSectionsByExactName(section.sections, name, recursive)
			);
		}
	});
	return filteredSections;
}
