/**
 * Returns an object containing component/section name and, optionally, an example index
 * from hash part or page URL:
 * #!/Button → { targetName: 'Button' }
 * #!/Button/1 → { targetName: 'Button', targetIndex: 1 }
 *
 * @param {string} hash
 * @returns {object}
 */
export default function getInfoFromHash(hash: string): {
    isolate?: boolean;
    hashArray?: string[];
    targetName?: string;
    targetIndex?: number;
};
