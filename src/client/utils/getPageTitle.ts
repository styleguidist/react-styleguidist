import get from 'lodash/get';
import { DisplayModes } from '../consts';
import { RsgSection } from '../../typings/RsgSection';

/**
 * Return page title:
 * “Style Guide Title” for all components view;
 * “Component Name — Style Guide Title” for isolated component or example view.
 * “Section Name — Style Guide Title” for isolated section view.
 *
 * @param {object} sections
 * @param {string} baseTitle
 * @param {string} displayMode
 * @return {string}
 */
export default function getPageTitle(
	sections: RsgSection[],
	baseTitle: string,
	displayMode: string
): string {
	if (displayMode === DisplayModes.notFound) {
		return 'Page not found';
	}
	if (sections.length) {
		if (
			displayMode === DisplayModes.component ||
			(displayMode === DisplayModes.example && sections[0].components)
		) {
			const name = get(sections[0], 'components.0.name', sections[0].name);
			return `${name} — ${baseTitle}`;
		} else if (displayMode === DisplayModes.section || displayMode === DisplayModes.example) {
			return `${sections[0].name} — ${baseTitle}`;
		}
	}
	return baseTitle;
}
