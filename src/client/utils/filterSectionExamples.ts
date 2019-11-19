import { SectionViewModel } from '../rsg-components/Section';

/**
 * Return a copy of the given section with the examples array filtered
 * to contain only the specified index
 *
 * @param {object} section
 * @param {number} index
 * @returns {object}
 */
export default function filterSectionExamples(
	section: SectionViewModel,
	index: number
): SectionViewModel {
	const content = section.content ? [section.content[index]] : [];
	return {
		...section,
		content,
	};
}
