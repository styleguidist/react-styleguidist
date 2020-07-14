/* Returns the HashPath to be included in the isolated page view url */
function getCurrentHashPath(
	stripFragment: RegExp,
	stripTrailingSlash: RegExp,
	currentHash: string
): string {
	/*This pattern matches urls like http://hostname.com/#button etc.,
	these urls are generated when we click on a component in the side nav-bar.
	This will verify whether the first character after the '#' symbol is an alphanumeric char or "_".
	this pattern used to validate the components names.*/
	const hashUrlPattern = /^#[a-zA-Z0-9_]/; // Ex. matches "#button","#1button","#_button"

	/* This pattern matches "#!/" string pattern in the 'currentHash' const
	this url pattern is used to show isolated page view mode in this project. */
	const isolatedPageViewUrlPattern = /^#!\//; // Ex. matches "#!/button"

	if (hashUrlPattern.test(currentHash)) {
		return '';
	} else {
		return currentHash && !isolatedPageViewUrlPattern.test(currentHash)
			? currentHash.replace(stripFragment, '').replace(stripTrailingSlash, '') + '/'
			: '';
	}
}

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

	const currentHashPath = getCurrentHashPath(stripFragment, stripTrailingSlash, currentHash);
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
	useSlugAsIdParam: boolean;
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
		useSlugAsIdParam,
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
		if (!useSlugAsIdParam) {
			encodedHashPath = [...encodedHashPath, encodedName];
		}
		url += `#/${encodedHashPath.join('/')}`;
	}

	if (useSlugAsIdParam) {
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
