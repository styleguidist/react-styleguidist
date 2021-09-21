import * as Rsg from '../../typings';
/**
 * Fuzzy filters sections by section or component name.
 *
 * @param {Array} sections
 * @param {string} query
 * @return {Array}
 */
export default function filterSectionsByName(sections: Rsg.TOCItem[], query: string): Rsg.TOCItem[];
