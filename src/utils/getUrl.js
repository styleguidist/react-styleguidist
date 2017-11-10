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
	{ name, slug, example, anchor, isolated, nochrome, absolute } = {},
	{ origin, pathname } = window.location
) {
	let url = pathname;

	if (nochrome) {
		url += '?nochrome';
	}

	if (anchor) {
		url += `#${slug}`;
	} else if (isolated || nochrome) {
		url += `#!/${name}`;
	}

	if (example !== undefined) {
		url += `/${example}`;
	}

	if (absolute) {
		return origin + url;
	}

	return url;
}
