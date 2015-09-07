export function setComponentsNames(components) {
	components.map((component) => {
		let module = component.module;
		if (!module.displayName) {
			throw Error(`displayName not found for ${component.filepath}`);
		}
		component.name = module.displayName;
	});
	return components;
}

export function globalizeComponents(components) {
	components.map((component) => {
		global[component.name] = component.module;
	});
}
