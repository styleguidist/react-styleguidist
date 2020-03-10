import { Theme } from './RsgTheme';

declare namespace global {
	/**
	 * function used in react tests to generate
	 * mocks of JSS Class names
	 */
	function classes(styles: (theme: Theme) => Record<string, any>): Record<string, string>;
}
