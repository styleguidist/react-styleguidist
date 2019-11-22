import processComponents from './processComponents';
import { RsgSection } from '../../typings/RsgSection';

/**
 * Recursively process each component in all sections.
 *
 * @param {Array} sections
 * @return {Array}
 */
export default function processSections(sections: RsgSection[]): RsgSection[] {
	return sections.map(section => ({
		...section,
		visibleName: section.name,
		components: processComponents(section.components || []),
		sections: processSections(section.sections || []),
	}));
}
