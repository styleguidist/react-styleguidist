import { RequireItResult } from './RsgRequireItResult';
import { ExamplesModule } from './RsgExample';
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
	exampleMode: ExpandMode;
	visibleName?: string;
	filepath?: string;
	externalLink?: boolean;
	href?: string;
}

/**
 * Section used on the client
 * It is the output of the function `client/utils/processSection`
 */
export interface Section extends ProcessedSection {
	content?: ExamplesModule;
	components?: Component[];
	sections?: Section[];
}

/**
 * Item of the Table Of Contents
 */
export interface TOCItem {
	name?: string;
	visibleName?: string;
	slug?: string;
	href?: string;
	heading?: boolean;
	shouldOpenInNewTab?: boolean;
	selected?: boolean;
	initialOpen?: boolean;
	forcedOpen?: boolean;
	content?: React.ReactNode;
	components?: Component[];
	sections?: Section[];
}

/**
 * Used in the config file and at the early stages of processing
 * in `schema/config.ts`
 */
export interface RawSection extends BaseSection {
	components?: string | string[] | (() => string[]);
	sections?: RawSection[];
	content?: string;
}

/**
 * Type returned when sections are transformed to their webpack
 * loadable equivalents
 */
export interface LoaderSection extends BaseSection {
	slug?: string;
	content?: RequireItResult;
	components: LoaderComponent[];
	sections: LoaderSection[];
	exampleMode: ExpandMode;
}
