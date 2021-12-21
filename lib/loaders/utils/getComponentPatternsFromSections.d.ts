import * as Rsg from '../../typings';
/**
 * Return all glob patterns from all sections.
 *
 * NOTE: a section cannot have components & subsections
 * @param {Array} sections
 * @returns {Array}
 */
export default function getComponentPatternsFromSections(sections: Rsg.ConfigSection[]): string[];
