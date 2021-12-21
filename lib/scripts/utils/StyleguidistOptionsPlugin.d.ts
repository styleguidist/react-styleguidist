import { Compiler, WebpackPluginInstance } from 'webpack';
import * as Rsg from '../../typings';
export default class StyleguidistOptionsPlugin implements WebpackPluginInstance {
    private options;
    constructor(options: Rsg.SanitizedStyleguidistConfig);
    private pluginFunc;
    /**
     *
     * @param compil webpack 4 `compilation.Compilation`, webpack 5 `Compilation`
     */
    private plugin;
    apply(compiler: Compiler): void;
}
