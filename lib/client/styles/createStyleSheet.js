import merge from 'lodash/merge';
import memoize from 'lodash/memoize';
import jss from './setupjss';
import * as theme from './theme';

/**
 * By default lodash/memoize only uses the first argument
 * for cache rendering. It works well if the first prameter
 * is enough.
 * We are Hot Module Replacing (HMR) stylesheets.
 * Therefore, we cannot cache stylesheet only by component.
 * We need to add cssRevisions to the key fo when the css files update,
 * the revision will update and we should update the stylesheet.
 */
export default memoize(function (styles, config, componentName, cssRevision) {
  var mergedTheme = merge({}, theme, config.theme);
  var customStyles = typeof config.styles === 'function' ? config.styles(mergedTheme) : config.styles;
  var mergedStyles = merge({}, styles(mergedTheme), customStyles && customStyles[componentName]);
  return jss.createStyleSheet(mergedStyles, {
    meta: componentName,
    link: true
  });
}, // calculate the cache key here
function (styles, config, componentName, cssRevision) {
  return componentName + "_" + cssRevision;
});