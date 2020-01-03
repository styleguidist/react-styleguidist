/**
 * Gets the URL fragment for an isolated or nochrome link.
 *
 * @param {string} $.currentHash The current hash fragment of the page
 * @param {string} $.encodedName The URL encoded name of the component
 * @return {string}
 */
function buildIsolatedOrNoChromeFragment({
	currentHash,
	encodedName,
}: {
	currentHash: string;
	encodedName: string;
}): string {
	const stripFragment = /^#\/?/;
	const stripTrailingSlash = /\/$/;
	const hashUrlPattern = /^#[a-zA-Z0-9_]/;
	let currentHashPath;
	if (hashUrlPattern.test(currentHash)) {
		currentHashPath = '';
	} else {
		currentHashPath =
			// skip if we are already using `#!/`
			currentHash && !currentHash.includes('#!/')
				? currentHash.replace(stripFragment, '').replace(stripTrailingSlash, '') + '/'
				: '';
	}
	return `#!/${currentHashPath}${encodedName}`;
}

interface GetUrlOptions {
	name: string;
	slug: string;
	/**
	 * Example index
	 */
	example: number;
	anchor: boolean;
	/**
	 * Isolated mode
	 */
	isolated: boolean;
	/**
	 * No chrome? (Can be combined with anchor or isolated)
	 */
	nochrome: boolean;
	/**
	 * Absolute URL? (Can be combined with other flags)
	 */
	absolute: boolean;
	hashPath: string[] | false;
	id: boolean;
	takeHash: boolean;
}

/**
 * Get component / section URL.
 *
 * @param {GetUrlOptions} options
 * @param location Location object (will use current page location by default)
 * @return {string}
 */
export default function getUrl(
	{
		name,
		slug,
		example,
		anchor,
		isolated,
		nochrome,
		absolute,
		hashPath,
		id,
		takeHash,
	}: Partial<GetUrlOptions> = {},
	{
		origin,
		pathname,
		hash = '',
	}: {
		origin: string;
		pathname: string;
		hash: string;
	} = window.location
): string {
	let url = pathname;

	const currentHash = hash.indexOf('?') > -1 ? hash.substring(0, hash.indexOf('?')) : hash;

	if (takeHash) {
		url += currentHash;
	}

	if (nochrome) {
		url += '?nochrome';
	}

	const encodedName = encodeURIComponent(name || '');

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
