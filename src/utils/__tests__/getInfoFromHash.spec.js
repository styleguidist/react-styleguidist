import getInfoFromHash from '../getInfoFromHash';

describe('getInfoFromHash', () => {
	it('should return important part of hash if it contains component name', () => {
		const result = getInfoFromHash('#!/button');
		expect(result).toEqual({ targetSlug: 'button', targetIndex: undefined });
	});

	it('should return an empty object if hash contains no component name', () => {
		const result = getInfoFromHash('button');
		expect(result).toEqual({});
	});

	it('should return the decoded targetSlug when router name is not English such as Chinese', () => {
		const result = getInfoFromHash('#!/Api%20%E7%BB%84%E4%BB%B6');
		expect(result).toEqual({ targetSlug: 'Api 组件', targetIndex: undefined });
	});
});
