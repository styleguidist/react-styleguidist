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
	if (displayMode === 'component' || displayMode === 'example') {
		return `${sections[0].components[0].name} — ${baseTitle}`;
	} else if (displayMode === 'section') {
		return `${sections[0].name} — ${baseTitle}`;
	}
	return baseTitle;
}
