/// <reference types="webpack-dev-server" />
import { Configuration } from 'webpack';
declare type MetaConfig = Configuration | ((env?: string) => Configuration);
/**
 * Merge two Webpack configs.
 *
 * In the user config:
 * - Ignores given sections (options.ignore).
 * - Ignores plugins that shouldn’t be used twice or may cause issues.
 *
 * @param {object} baseConfig
 * @param {object|Function} userConfig
 * @param {string} env
 * @return {object}
 */
export default function mergeWebpackConfig(baseConfig: MetaConfig, userConfig: MetaConfig, env?: string): Configuration;
export {};
