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
export default function getUrl({ name, slug, example, anchor, isolated, nochrome, absolute, hashPath, useSlugAsIdParam, takeHash, }?: Partial<GetUrlOptions>, { origin, pathname, hash, }?: {
    origin: string;
    pathname: string;
    hash: string;
}): string;
export {};
