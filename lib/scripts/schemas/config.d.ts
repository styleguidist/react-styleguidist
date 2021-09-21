import * as Rsg from '../../typings';
export declare type StyleguidistConfigKey = keyof Rsg.SanitizedStyleguidistConfig;
export interface ConfigSchemaOptions<T> {
    process?(value: any, config: T, rootDir: string): any;
    default?: any;
    required?: boolean | ((config?: T) => string | boolean);
    deprecated?: string;
    removed?: string;
    type?: string | string[];
    example?: any;
}
declare const configSchema: Record<StyleguidistConfigKey, ConfigSchemaOptions<Rsg.StyleguidistConfig>>;
export default configSchema;
