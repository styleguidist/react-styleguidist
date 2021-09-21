import * as Rsg from '../../typings';
/**
 * Return object for one level of sections.
 *
 * @param {Array} sections
 * @param {object} config
 * @param {number} parentDepth
 * @returns {Array}
 */
export default function getSections(sections: Rsg.ConfigSection[], config: Rsg.SanitizedStyleguidistConfig, parentDepth?: number): Rsg.LoaderSection[];
/**
 * Return an object for a given section with all components and subsections.
 * @param {object} section
 * @param {object} config
 * @param {number} parentDepth
 * @returns {object}
 */
export declare function processSection(section: Rsg.ConfigSection, config: Rsg.SanitizedStyleguidistConfig, parentDepth?: number): Rsg.LoaderSection;
