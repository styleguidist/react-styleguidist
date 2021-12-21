import * as Rsg from '../../typings';
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
export default function getPageTitle(sections: Rsg.Section[], baseTitle: string, displayMode: string): string;
