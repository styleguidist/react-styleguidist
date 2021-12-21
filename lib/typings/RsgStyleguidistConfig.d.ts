import WebpackDevServer from 'webpack-dev-server';
import { Configuration, loader } from 'webpack';
import { TransformOptions } from 'buble';
import { Handler, DocumentationObject, PropDescriptor } from 'react-docgen';
import { ASTNode } from 'ast-types';
import { NodePath } from 'ast-types/lib/node-path';
import { Styles } from 'jss';
import { RecursivePartial } from './RecursivePartial';
import { ExpandMode } from './RsgComponent';
import { PropsObject } from './RsgPropsObject';
import { CodeExample } from './RsgExample';
import { ConfigSection, Section } from './RsgSection';
import { Theme } from './RsgTheme';
export interface StyleguidistLoaderContext extends loader.LoaderContext {
    _styleguidist: SanitizedStyleguidistConfig;
}
interface BaseStyleguidistConfig {
    assetsDir: string | string[];
    tocMode: ExpandMode;
    compilerConfig: TransformOptions;
    components: (() => string[]) | string | string[];
    configDir: string;
    context: Record<string, any>;
    contextDependencies: string[];
    configureServer(server: WebpackDevServer, env: string): string;
    dangerouslyUpdateWebpackConfig: (server: Configuration, env: string) => Configuration;
    defaultExample: string | false;
    exampleMode: ExpandMode;
    editorConfig: {
        theme: string;
    };
    getComponentPathLine(componentPath: string): string;
    getExampleFilename(componentPath: string): string;
    handlers: (componentPath: string) => Handler[];
    ignore: string[];
    logger: {
        info(message: string): void;
        warn(message: string): void;
        debug(message: string): void;
    };
    minimize: boolean;
    mountPointId: string;
    moduleAliases: Record<string, string>;
    pagePerSection: boolean;
    previewDelay: number;
    printBuildInstructions(config: SanitizedStyleguidistConfig): void;
    printServerInstructions(config: SanitizedStyleguidistConfig, options: {
        isHttps: boolean;
    }): void;
    propsParser(filePath: string, code: string, resolver: (ast: ASTNode, parser: {
        parse: (code: string) => ASTNode;
    }) => NodePath<any, any> | NodePath[], handlers: Handler[]): DocumentationObject;
    require: string[];
    resolver(ast: ASTNode, parser: {
        parse: (code: string) => ASTNode;
    }): NodePath<any, any> | NodePath[];
    ribbon?: {
        text?: string;
        url: string;
    };
    serverHost: string;
    serverPort: number;
    showCode: boolean;
    showUsage: boolean;
    showSidebar: boolean;
    skipComponentsWithoutExample: boolean;
    sortProps(props: PropDescriptor[]): PropDescriptor[];
    styleguideComponents: Record<string, string>;
    styleguideDir: string;
    styles: Styles | string | ((theme: Theme) => Styles);
    template: any;
    theme: RecursivePartial<Theme> | string;
    title: string;
    updateDocs(doc: PropsObject, file: string): PropsObject;
    updateExample(props: Omit<CodeExample, 'type'>, ressourcePath: string): Omit<CodeExample, 'type'>;
    updateWebpackConfig(config: Configuration): Configuration;
    usageMode: ExpandMode;
    verbose: boolean;
    version: string;
    webpackConfig: Configuration | ((env?: string) => Configuration);
}
export interface ProcessedStyleguidistConfig extends BaseStyleguidistConfig {
    sections: Section[];
    theme: RecursivePartial<Theme>;
    styles: ((th: Theme) => Styles) | Styles;
}
export declare type ProcessedStyleguidistCSSConfig = Pick<ProcessedStyleguidistConfig, 'theme'> & Pick<ProcessedStyleguidistConfig, 'styles'>;
export interface SanitizedStyleguidistConfig extends BaseStyleguidistConfig {
    sections: ConfigSection[];
}
/**
 * definition of the config object where everything is optional
 * note that teh default example can be both a string and a boolean but ends
 * up only being a string after sanitizing
 */
export interface StyleguidistConfig extends RecursivePartial<Omit<SanitizedStyleguidistConfig, 'defaultExample'>> {
    defaultExample?: string | boolean;
}
export {};
