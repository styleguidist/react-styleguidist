/**
 * CreateSettingsLink for sharing
 * @param  {Object} props
 * @return {String}
 */
export function createSettingsLink(props, settings) {
	const jsonProps = JSON.stringify(props);
	const jsonSettings = JSON.stringify(settings);
	const queryArray = [];
	if (props) {
		queryArray.push(`props=${encodeURIComponent(jsonProps)}`);
	}
	if (settings) {
		queryArray.push(`settings=${encodeURIComponent(jsonSettings)}`);
	}
	const queryString = queryArray.length === 0 ? '' : `?${queryArray.join('&')}`;
	return `${location.origin}${queryString}${location.hash.replace(/(\?.*)/, '')}`;
}

/**
 * Get query variable from search string
 * @param  {[type]} variable [description]
 * @return {[type]}          [description]
 */
export function getQueryVariable(variable) {
	const query = location.search.substring(1);
	const vars = query.split('&');
	let find;
	vars.forEach((item) => {
		const pair = item.split('=');
		if (decodeURIComponent(pair[0]) === variable) {
			find = decodeURIComponent(pair[1]);
		}
	});
	return find || String();
}
