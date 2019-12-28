/**
 * Returns a unique MD5 small hash that can will be used as a render key for the root component
 * The algorithm was found here
 * https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 * @param input a string to be hashed
 * @returns the MD5 hash as a number
 */
function hashCode(input: string): number {
	let hash = 0;
	let i;
	let chr;
	for (i = 0; i < input.length; i++) {
		chr = input.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}

/**
 * Takes an object containing a `theme` and a `styles` and returns a number,
 * that is unique to this exact combination
 * @param config The styles and theme part of a stylequide.config
 * @returns a hash of the object
 */
export default (config: Rsg.ProcessedStyleguidistCSSConfig): number =>
	hashCode(JSON.stringify({ theme: config.theme, styles: config.styles }));
