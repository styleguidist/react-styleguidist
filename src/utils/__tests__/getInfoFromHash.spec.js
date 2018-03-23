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

	it('should return the decoded targetName when router name is not English such as Chinese', () => {
		const result = getInfoFromHash('#!/Api%20%E7%BB%84%E4%BB%B6');
		expect(result).toEqual({ targetName: 'Api 组件', targetIndex: undefined });
	});
});
