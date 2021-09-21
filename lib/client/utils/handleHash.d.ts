/**
 * If hash has a certain element
 *
 * @param {string} hash
 * @param {string} search
 * @return {boolean}
 */
export declare const hasInHash: (hash: string, search: string) => boolean;
/**
 * Get hash value without '#', prependHash and parameters
 *
 * @param {string} hash
 * @param {string} prependHash
 * @return {string}
 */
export declare const getHash: (hash: string, prependHash?: string | undefined) => string;
/**
 * Get hash value split into an Array.
 *
 * @param {string} hash
 * @param {string} prependHash
 * @return {Array.<string>}
 */
export declare const getHashAsArray: (hash: string, prependHash?: string | undefined) => string[];
/**
 * Get a parameter by name in hash
 *
 * @param {string} hash
 * @param {string} name
 * @return {string}
 */
export declare const getParameterByName: (hash: string, name: string) => string | null;
