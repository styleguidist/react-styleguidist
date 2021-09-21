import "core-js/modules/es.array.index-of";
import "core-js/modules/es.array.map";
import "core-js/modules/es.regexp.constructor";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.replace";
import "core-js/modules/es.string.split";
import escapeRegExp from 'lodash/escapeRegExp'; // We’re using this file to handle the hash to develop the routes, there are two types of hash '#/' and '#!/'
// However, it is a temporal solution because is necessary using a library third-party that it is his focus
// You can find more information here:
// https://github.com/styleguidist/react-styleguidist/pull/993

var defaultPrependHash = '#/';
var separator = '/';
var hashValRegexp = /(.*)\?/;

function trimHash(hash, prependHash) {
  if (!hash) {
    return '';
  }

  var regexp = new RegExp('^' + escapeRegExp(prependHash || defaultPrependHash), 'g');
  return hash.replace(regexp, '');
}

var trimParams = function trimParams(hash) {
  var result = hashValRegexp.exec(hash);
  return result && result[1] || hash;
};
/**
 * If hash has a certain element
 *
 * @param {string} hash
 * @param {string} search
 * @return {boolean}
 */


export var hasInHash = function hasInHash(hash, search) {
  return hash !== '' && hash.indexOf(search) > -1;
};
/**
 * Get hash value without '#', prependHash and parameters
 *
 * @param {string} hash
 * @param {string} prependHash
 * @return {string}
 */

export var getHash = function getHash(hash, prependHash) {
  return decodeURIComponent(trimParams(trimHash(hash, prependHash)));
};
/**
 * Get hash value split into an Array.
 *
 * @param {string} hash
 * @param {string} prependHash
 * @return {Array.<string>}
 */

export var getHashAsArray = function getHashAsArray(hash, prependHash) {
  return trimParams(trimHash(hash, prependHash)).split(separator).map(decodeURIComponent);
};
/**
 * Get a parameter by name in hash
 *
 * @param {string} hash
 * @param {string} name
 * @return {string}
 */

export var getParameterByName = function getParameterByName(hash, name) {
  name = name.replace(/[[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  var results = regex.exec(hash);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};