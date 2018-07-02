import get from 'lodash/get';
import { DisplayModes } from '../consts';

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
export default function getPageTitle(sections, baseTitle, displayMode) {
	if (displayMode === DisplayModes.component || displayMode === DisplayModes.example) {
		const name = get(sections[0], 'components.0.name', sections[0].name);
		return `${name} — ${baseTitle}`;
	} else if (displayMode === DisplayModes.section) {
		return `${sections[0].name} — ${baseTitle}`;
	}
	return baseTitle;
}
