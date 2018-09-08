import "core-js/modules/es6.regexp.constructor";
import "core-js/modules/es6.regexp.replace";
import "core-js/modules/es6.regexp.split";

/**
 * RegExp to fuzzy filter components list by component name.
 *
 * @param {string} query
 * @return {RegExp}
 */
export default function getFilterRegExp(query) {
  query = query.replace(/[^a-z0-9]/gi, '').split('').join('.*');
  return new RegExp(query, 'i');
}