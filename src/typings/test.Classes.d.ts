import * as Rsg from './';
/**
 * function used in react tests to generate
 * mocks of JSS Class names
 */
declare const classes: (
	styles: (theme: Rsg.Theme) => Record<string, any>
) => Record<string, string>;
