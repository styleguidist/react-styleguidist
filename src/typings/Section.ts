import { Component } from './Component';
import { EXPAND_MODE } from '../scripts/schemas/config';

export interface Section {
	name?: string;
	visibleName?: string;
	components?: Component[];
	sections?: Section[];
	ignore?: string | string[];
	content?: string;
	sectionDepth?: number;
	description?: string;
	exampleMode?: EXPAND_MODE;
	usageMode?: EXPAND_MODE;
	slug?: string;
	filepath?: string;
	href?: string;
	external?: string;
}
