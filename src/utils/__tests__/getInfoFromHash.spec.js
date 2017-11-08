import getInfoFromHash from '../getInfoFromHash';

describe('getInfoFromHash', () => {
	it('should return important part of hash if it contains component name', () => {
		const result = getInfoFromHash('#!/Button');
		expect(result).toEqual({ targetName: 'Button', targetIndex: undefined });
	});

	it('should return an empty object if hash contains no component name', () => {
		const result = getInfoFromHash('Button');
		expect(result).toEqual({});
	});
});
