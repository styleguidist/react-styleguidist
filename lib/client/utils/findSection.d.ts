import * as Rsg from '../../typings';
/**
 * Recursively finds a section with a given name (exact match)
 *
 * @param  {Array}  sections
 * @param  {string} name
 * @return {object}
 */
export default function findSection(sections: Rsg.Section[], name: string): Rsg.Section | undefined;
