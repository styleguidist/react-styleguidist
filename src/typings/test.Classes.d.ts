import { Theme } from './RsgTheme';

declare global {
	/**
	 * function used in react tests to generate
	 * mocks of JSS Class names
	 */
	const classes: (styles: (theme: Theme) => Record<string, any>) => Record<string, string>;
}
