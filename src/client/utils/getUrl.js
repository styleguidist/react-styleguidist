/**
 * Get component / section URL.
 *
 * @param {string} $.name Name
 * @param {string} $.slug Slug
 * @param {number} $.example Example index
 * @param {boolean} $.anchor Anchor?
 * @param {boolean} $.isolated Isolated mode?
 * @param {boolean} $.nochrome No chrome? (Can be combined with anchor or isolated)
 * @param {boolean} $.absolute Absolute URL? (Can be combined with other flags)
 * @param {object} [location] Location object (will use current page location by default)
 * @return {string}
 */
export default function getUrl(
	{ name, slug, example, anchor, isolated, nochrome, absolute, hashPath, id, takeHash } = {},
	{ origin, pathname, hash = '' } = window.location
) {
	let url = pathname;

	const currentHash = hash.indexOf('?') > -1 ? hash.substring(0, hash.indexOf('?')) : hash;

	if (takeHash) {
		url += currentHash;
	}

	if (nochrome) {
		url += '?nochrome';
	}

	const encodedName = encodeURIComponent(name);

	if (anchor) {
		url += `#${slug}`;
	} else if (isolated || nochrome) {
		url += buildIsolatedOrNoChromeFragment({ currentHash, encodedName });
	}

	if (hashPath) {
		let encodedHashPath = hashPath.map(encodeURIComponent);
		if (!id) {
			encodedHashPath = [...encodedHashPath, encodedName];
		}
		url += `#/${encodedHashPath.join('/')}`;
	}

	if (id) {
		url += `?id=${slug}`;
	}

	if (example !== undefined) {
		url += `/${example}`;
	}

	if (absolute) {
		return origin + url;
	}

	return url;
}

/**
 * Gets the URL fragment for an isolated or nochrome link.
 *
 * @param {string} $.currentHash The current hash fragment of the page
 * @param {string} $.encodedName The URL encoded name of the component
 * @return {string}
 */
function buildIsolatedOrNoChromeFragment({ currentHash, encodedName }) {
	const stripFragment = /^#\/?/;
	const stripTrailingSlash = /\/$/;
	const currentHashPath =
		// skip if we are already using `#!/`
		currentHash && !currentHash.includes('#!/')
			? currentHash.replace(stripFragment, '').replace(stripTrailingSlash, '') + '/'
			: '';
	return `#!/${currentHashPath}${encodedName}`;
}
