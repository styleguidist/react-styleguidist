export default function(items, groupsConfig) {
	// console.error('--------- filter by groups --------');
	// console.warn(items);
	// console.info(groupsConfig);
	if (groupsConfig) {
		items = items.filter((item) => {
			// console.log(item);

			if (item.static && groupsConfig.includeStatic) {
				return true;
			}

			if (item.static && !groupsConfig.includeStatic) {
				return false;
			}

			if (!item.static && groupsConfig.includeStatic) {
				return false;
			}

			if (!item.pathLine) {
				return true;
			}

			return groupsConfig.pathRegExp.test(item.pathLine);
		});
	}

	// console.warn(items);
	return items;
}
