import "core-js/modules/es6.regexp.split";
import "core-js/modules/es6.regexp.replace";
import "core-js/modules/es6.regexp.constructor";
import escapeRegExp from 'lodash/escapeRegExp'; // We’re using this file to handle the hash to develop the routes, there are two types of hash '#/' and '#!/'
// However, it is a temporal solution because is necessary using a library third-party that it is his focus
// You can find more information here:
// https://github.com/styleguidist/react-styleguidist/pull/993

const defaultPrependHash = '#/';
const separator = '/';
const hashValRegexp = /(.*)\?/;

function trimHash(hash, prependHash) {
  if (!hash) {
    return '';
  }

  const regexp = new RegExp('^' + escapeRegExp(prependHash || defaultPrependHash), 'g');
  return hash.replace(regexp, '');
}

const trimParams = function trimParams(hash) {
  const result = hashValRegexp.exec(hash);
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
  return getHash(hash, prependHash).split(separator);
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
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(hash);

  if (!results) {
    return null;
  }

  if (!results[2]) {
    return '';
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};