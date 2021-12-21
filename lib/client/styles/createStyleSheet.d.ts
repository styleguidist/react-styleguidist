/// <reference types="lodash" />
import { StyleSheet } from 'jss';
import * as Rsg from '../../typings';
declare const _default: ((styles: (t: Rsg.Theme) => Record<string, any>, config: Rsg.ProcessedStyleguidistCSSConfig, componentName: string, cssRevision: string) => StyleSheet<string>) & import("lodash").MemoizedFunction;
/**
 * By default lodash/memoize only uses the first argument
 * for cache rendering. It works well if the first prameter
 * is enough.
 * We are Hot Module Replacing (HMR) stylesheets.
 * Therefore, we cannot cache stylesheet only by component.
 * We need to add cssRevisions to the key fo when the css files update,
 * the revision will update and we should update the stylesheet.
 */
export default _default;
