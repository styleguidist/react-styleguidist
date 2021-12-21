import * as Rsg from '../typings';
/**
 * Read, parse and validate config file or passed config.
 *
 * @param {object|string} [config] All config options or config file name or nothing.
 * @param {function} [update] Change config object before running validation on it.
 * @returns {object}
 */
declare function getConfig(config?: string | Rsg.StyleguidistConfig, update?: (conf: Rsg.StyleguidistConfig) => Rsg.StyleguidistConfig): Rsg.SanitizedStyleguidistConfig;
export default getConfig;
