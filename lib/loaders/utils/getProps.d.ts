import { DocumentationObject } from 'react-docgen';
import * as Rsg from '../../typings';
/**
 * 1. Remove non-public methods.
 * 2. Extract doclets.
 * 3. Highlight code in descriptions.
 * 4. Extract @example doclet (load linked file with examples-loader).
 *
 * @param {object} doc
 * @param {string} filepath
 * @returns {object}
 */
export default function getProps(doc: DocumentationObject, filepath?: string): Rsg.TempPropsObject;
