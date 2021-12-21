/// <reference types="react" />
import { RequireItResult } from './RsgRequireItResult';
import { MarkdownExample, Example } from './RsgExample';
import { LoaderComponent, ExpandMode, Component } from './RsgComponent';
export interface BaseSection {
    name?: string;
    slug?: string;
    ignore?: string | string[];
    description?: string;
    exampleMode?: ExpandMode;
    usageMode?: ExpandMode;
    href?: string;
    sectionDepth?: number;
    external?: boolean;
    expand?: boolean;
}
export interface ProcessedSection extends BaseSection {
    visibleName?: string;
    filepath?: string;
    externalLink?: boolean;
    href?: string;
}
/**
 * Section used on the client in javascript
 * It is the output of the function `client/utils/processSection`
 */
export interface Section extends ProcessedSection {
    content?: Example[] | string;
    components?: Component[];
    sections?: Section[];
}
/**
 * Item of the Table Of Contents used in
 * ComponentsList
 * TableOfContent
 * filterSectionByName
 */
export interface TOCItem extends ProcessedSection {
    heading?: boolean;
    shouldOpenInNewTab?: boolean;
    selected?: boolean;
    initialOpen?: boolean;
    forcedOpen?: boolean;
    content?: React.ReactNode;
    components?: TOCItem[];
    sections?: TOCItem[];
}
/**
 * Used in the config file and at the early stages of processing
 * in `schema/config.ts` this is the type that is used
 */
export interface ConfigSection extends BaseSection {
    components?: string | string[] | (() => string[]);
    sections?: ConfigSection[];
    content?: string;
}
/**
 * Type returned when sections are transformed to their webpack
 * loadable equivalents
 */
export interface LoaderSection extends BaseSection {
    slug?: string;
    content?: RequireItResult | MarkdownExample;
    components: LoaderComponent[];
    sections: LoaderSection[];
}
