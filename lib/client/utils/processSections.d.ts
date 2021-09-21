import * as Rsg from '../../typings';
import { HrefOptions } from './processComponents';
/**
 * Recursively process each component in all sections.
 *
 * @param {Array} sections
 * @return {Array}
 */
export default function processSections(sections: Rsg.Section[], { useRouterLinks, useHashId, hashPath }: HrefOptions): Rsg.Section[];
