import isFunction from 'lodash/isFunction';
import { Slots } from '../consts';

/**
 * TODO
 *
 * @param {object[]} plugins
 * @param {object} config
 * @return {object}
 */
export default function loadPlugins(plugins, config) {
	const slotNames = Object.keys(Slots);
	const slots = slotNames.reduce((slots, key) => {
		slots[key] = [];
		return slots;
	}, {});

	plugins.forEach(({ module, options }) => {
		const func = module.default || module;
		if (!isFunction(func)) {
			throw Error('Plugin not a function'); // TODO
		}

		const plugin = func(options, config);
		// TODO: validate

		if (plugin.fills) {
			plugin.fills.forEach(fill => {
				// TODO: validate

				if (!Slots[fill.type]) {
					throw new Error(`Unknown fill type "${name}", available types: ${slotNames.join(', ')}`);
				}

				slots[fill.type].push(fill);
			});
		}
	});

	return slots;
}
