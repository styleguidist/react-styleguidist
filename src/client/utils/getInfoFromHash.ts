import { hasInHash, getHashAsArray } from './handleHash';

/**
 * Returns an object containing component/section name and, optionally, an example index
 * from hash part or page URL:
 * #!/Button → { targetName: 'Button' }
 * #!/Button//1 → { targetName: 'Button', targetIndex: 1 }
 * #!/Button//basic → { targetName: 'Button', targetIndex: 'basic' }
 */
export default function getInfoFromHash(
	hash: string
): {
	isolate?: boolean;
	hashArray?: string[];
	targetName?: string;
	targetIndex?: number | string;
} {
	const shouldIsolate = hasInHash(hash, '#!/');
	if (shouldIsolate || hasInHash(hash, '#/')) {
		const [baseHash, targetHash] = hash.split('//');
		const hashArray = getHashAsArray(baseHash, shouldIsolate ? '#!/' : '#/');
		return {
			isolate: shouldIsolate,
			hashArray,
			targetName: hashArray[0],
			targetIndex: parseInt(targetHash, 10) || targetHash,
		};
	}
	return {};
}
