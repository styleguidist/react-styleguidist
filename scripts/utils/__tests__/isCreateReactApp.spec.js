import isCreateReactApp from '../isCreateReactApp';

it('should return true if given package.json depends on create-react-app', () => {
	const result = isCreateReactApp({
		name: 'test',
		dependencies: {
			'file-loader': '~0.9.0',
			'postcss-loader': '~0.13.0',
			'react-scripts': '~0.6.1',
			'url-loader': '~0.5.7',
		},
	});
	expect(result).toBeTruthy();
});

it('should return false if given package.json does not depend on create-react-app', () => {
	const result = isCreateReactApp({
		name: 'test',
		dependencies: {
			'file-loader': '~0.9.0',
			'postcss-loader': '~0.13.0',
			'url-loader': '~0.5.7',
		},
	});
	expect(result).toBeFalsy();
});
