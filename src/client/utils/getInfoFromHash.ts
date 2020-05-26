import { hasInHash, getHashAsArray } from './handleHash';

function hasDigitsOnly(item: string): boolean {
	return item.match(/^\d+$/) !== null;
}

/**
 * Returns an object containing component/section name and, optionally, an example index
 * from hash part or page URL:
 * #!/Button → { targetName: 'Button' }
 * #!/Button/1 → { targetName: 'Button', targetIndex: 1 }
 *
 * @param {string} hash
 * @returns {object}
 */
export default function getInfoFromHash(
	hash: string
): {
	isolate?: boolean;
	hashArray?: string[];
	targetName?: string;
	targetIndex?: number;
} {
	const shouldIsolate = hasInHash(hash, '#!/');
	if (shouldIsolate || hasInHash(hash, '#/')) {
		const hashArray = getHashAsArray(hash, shouldIsolate ? '#!/' : '#/');
		const targetHash = hashArray[hashArray.length - 1];
		return {
			isolate: shouldIsolate,
			hashArray: hashArray.filter(item => !hasDigitsOnly(item)),
			targetName: hashArray[0],
			targetIndex: hasDigitsOnly(targetHash) ? parseInt(targetHash, 10) : undefined,
		};
	}
	return {};
}
