import isNaN from 'lodash/isNaN';

/**
 * Returns an object containing component/section name and, optionally, an example index
 * from hash part or page URL:
 * #!/button → { targetSlug: 'button' }
 * #!/button/1 → { targetSlug: 'button', targetIndex: 1 }
 *
 * @param {string} hash
 * @returns {object}
 */
export default function getInfoFromHash(hash) {
	if (hash.substr(0, 3) === '#!/') {
		const tokens = hash.substr(3).split('/');
		const index = parseInt(tokens[1], 10);
		return {
			targetSlug: decodeURIComponent(tokens[0]),
			targetIndex: isNaN(index) ? undefined : index,
		};
	}
	return {};
}
