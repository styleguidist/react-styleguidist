import isFunction from 'lodash/isFunction';

/**
 * TODO
 *
 * @param {object[]} plugins
 * @param {object} config
 * @return {object}
 */
export default function loadPlugins(plugins, config) {
	const slots = {
		sectionToolbarButton: [],
		componentToolbarButton: [],
		exampleToolbarButton: [],
		exampleTabButton: [],
		exampleTab: [],
		docsTabButton: [],
		docsTab: [],
		previewContainer: [],
	};

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

				if (!slots[fill.type]) {
					throw Error('Unknown fill'); // TODO
				}

				slots[fill.type].push(fill);
			});
		}
	});

	return slots;
}
