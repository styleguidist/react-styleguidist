function hashCode(input: string): number {
	let hash = 0;
	let i;
	let chr;
	if (input.length === 0) {
		return hash;
	}
	for (i = 0; i < input.length; i++) {
		chr = input.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0; // Convert to 32bit integer
	}
	return hash;
}

export default (config: Rsg.ProcessedStyleguidistCSSConfig): number =>
	hashCode(JSON.stringify({ theme: config.theme, styles: config.styles }));
