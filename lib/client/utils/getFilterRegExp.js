import "core-js/modules/es.array.join";
import "core-js/modules/es.regexp.constructor";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.replace";
import "core-js/modules/es.string.split";

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