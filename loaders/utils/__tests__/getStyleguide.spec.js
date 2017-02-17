import path from 'path';
import getStyleguide from '../getStyleguide';

const configDir = path.resolve(__dirname, '../../../test');

it('should return correct component paths: glob', () => {
	const result = getStyleguide({
		sections: [{ components: 'components/**/*.js' }],
		configDir,
		getExampleFilename: () => 'Readme.md',
		getComponentPathLine: filepath => filepath,
	});
	expect(result).toBeTruthy();
	expect(result.sections[0].components[0].filepath).toBe('components/Button/Button.js');
	expect(result.sections[0].components[1].filepath).toBe('components/Placeholder/Placeholder.js');
});

it('should return correct component paths: function returning absolute paths', () => {
	const result = getStyleguide({
		sections: [{
			components: () => ([
				`${configDir}/components/Button/Button.js`,
				`${configDir}/components/Placeholder/Placeholder.js`,
			]),
		}],
		configDir,
		getExampleFilename: () => 'Readme.md',
		getComponentPathLine: filepath => filepath,
	});
	expect(result).toBeTruthy();
	expect(result.sections[0].components[0].filepath).toBe('components/Button/Button.js');
	expect(result.sections[0].components[1].filepath).toBe('components/Placeholder/Placeholder.js');
});

it('should return correct component paths: function returning relative paths', () => {
	const result = getStyleguide({
		sections: [{
			components: () => ([
				'components/Button/Button.js',
				'components/Placeholder/Placeholder.js',
			]),
		}],
		configDir,
		getExampleFilename: () => 'Readme.md',
		getComponentPathLine: filepath => filepath,
	});
	expect(result).toBeTruthy();
	expect(result.sections[0].components[0].filepath).toBe('components/Button/Button.js');
	expect(result.sections[0].components[1].filepath).toBe('components/Placeholder/Placeholder.js');
});

it('should filter out components without examples if skipComponentsWithoutExample=true', () => {
	const result = getStyleguide({
		sections: [{
			components: () => ([
				'components/Button/Button.js',
				'components/RandomButton/RandomButton.js',
			]),
		}],
		configDir,
		skipComponentsWithoutExample: true,
		getExampleFilename: componentPath => path.join(path.dirname(componentPath), 'Readme.md'),
		getComponentPathLine: filepath => filepath,
	});
	expect(result).toBeTruthy();
	expect(result.sections[0].components).toHaveLength(1);
	expect(result.sections[0].components[0].filepath).toBe('components/Button/Button.js');
});
