import * as Rsg from '../../typings';
/**
 * Recursively filters all components in all sections by component name.
 *
 * @param {object} sections
 * @param {string} name
 * @param {boolean} recursive
 * @return {Array}
 */
export default function filterComponentsInSectionsByExactName(sections: Rsg.Section[], name: string, recursive: boolean): Rsg.Section[];
