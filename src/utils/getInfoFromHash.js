import isNaN from 'lodash/isNaN';

/**
 * Returns an object containing component/section name and, optionally, an example index
 * from hash part or page URL:
 * #!/Button → { targetName: 'Button' }
 * #!/Button/1 → { targetName: 'Button', targetIndex: 1 }
 *
 * @param {string} hash
 * @returns {object}
 */
export default function getInfoFromHash(hash) {
	const shouldIsolate = hash.substr(0, 3) === '#!/';
	if (shouldIsolate || hash.substr(0, 2) === '#/') {
		const path = hash.replace(/\?id=[^]*/, '');
		const tokens = path
			.substr(shouldIsolate ? 3 : 2)
			.split('/')
			.map(token => decodeURIComponent(token));
		const index = parseInt(tokens[tokens.length - 1], 10);
		return {
			isolate: shouldIsolate,
			tokens: tokens.filter(token => isNaN(parseInt(token, 10)) && token !== ''),
			targetName: tokens[0],
			targetIndex: isNaN(index) ? undefined : index,
		};
	}
	return {};
}
