import getComponent from './getComponent';

/**
 * Expose component as global variables.
 *
 * @param {Object} component
 */
export default function globalizeComponent(component) {
	if (!component.name) {
		return;
	}

	const globalComponents = global.RsgUserComponents || (global.RsgUserComponents = {});
	globalComponents[component.name] = getComponent(component.module);
}
