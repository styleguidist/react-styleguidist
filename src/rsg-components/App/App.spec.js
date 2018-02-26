import React from 'react';
import { cloneDeep } from 'lodash';
import App from './App';

const styleguide = {
	config: {
		title: 'My Style Guide',
	},
	sections: [
		{
			components: [
				{
					props: {
						displayName: 'Button',
					},
					module: 'ButtonModule',
				},
				{
					props: {
						displayName: 'Image',
					},
					module: 'ImageModule',
				},
			],
		},
	],
	welcomeScreen: false,
	patterns: ['button', 'input'],
};
const codeRevision = 1;
const location = {
	hash: '',
};
const doc = {
	title: () => {},
};
const history = {
	replaceState: () => {},
};

afterEach(() => {
	delete global.Button;
	delete global.Image;
});

describe('<App />', () => {
	it('should render StyleGuide component', () => {
		const result = shallow(
			<App
				styleguide={styleguide}
				codeRevision={codeRevision}
				loc={location}
				doc={doc}
				hist={history}
			/>
		);
		expect(result).toMatchSnapshot();
	});

	it('should globalize all components', () => {
		shallow(
			<App
				styleguide={styleguide}
				codeRevision={codeRevision}
				loc={location}
				doc={doc}
				hist={history}
			/>
		);
		expect(global.Button).toBe('ButtonModule');
		expect(global.Image).toBe('ImageModule');
	});

	it('should globalize all components in isolated mode', () => {
		shallow(
			<App
				styleguide={styleguide}
				codeRevision={codeRevision}
				loc={{ hash: '#!/Button' }}
				doc={doc}
				hist={history}
			/>
		);
		expect(global.Button).toBe('ButtonModule');
		expect(global.Image).toBe('ImageModule');
	});

	it('should change document title', () => {
		const title = jest.fn();
		const location = { hash: '' };
		Object.defineProperty(location, 'title', {
			set: title,
		});
		shallow(
			<App
				styleguide={styleguide}
				codeRevision={codeRevision}
				loc={location}
				doc={location}
				hist={history}
			/>
		);
		expect(title).toBeCalledWith('My Style Guide');
	});

	it('should change document title in isolated mode', () => {
		const title = jest.fn();
		const location = { hash: '#!/Button' };
		Object.defineProperty(location, 'title', {
			set: title,
		});
		shallow(
			<App
				styleguide={styleguide}
				codeRevision={codeRevision}
				loc={location}
				doc={location}
				hist={history}
			/>
		);
		expect(title).toBeCalledWith('Button — My Style Guide');
	});

	it('should remove #/ from the address bar', () => {
		const location = { hash: '#/', pathname: '/pizza', search: '?foo=bar' };
		const history = { replaceState: jest.fn() };
		shallow(
			<App
				styleguide={styleguide}
				codeRevision={codeRevision}
				loc={location}
				doc={doc}
				hist={history}
			/>
		);
		expect(history.replaceState).toBeCalledWith('', 'My Style Guide', '/pizza?foo=bar');
	});

	it('should scroll to top on sections change, when pagePerSections is true', () => {
		const scrollTo = jest.fn();
		global.window.scrollTo = scrollTo;

		const styleguideCopy = cloneDeep(styleguide);
		styleguideCopy.config.pagePerSection = true;

		const props = {
			styleguide: styleguideCopy,
			codeRevision,
			loc: { hash: '#A' },
			doc,
			hist: history,
		};

		const wrapper = shallow(<App {...props} />);
		wrapper.setProps({ ...props, loc: { hash: '#B' } });

		expect(scrollTo).toHaveBeenCalled();
	});

	it('should not scroll to top on sections change, when pagePerSections is false', () => {
		const scrollTo = jest.fn();
		global.window.scrollTo = scrollTo;

		const styleguideCopy = cloneDeep(styleguide);
		styleguideCopy.config.pagePerSection = false;

		const props = {
			styleguide: styleguideCopy,
			codeRevision,
			loc: { hash: '#A' },
			doc,
			hist: history,
		};

		const wrapper = shallow(<App {...props} />);
		wrapper.setProps({ ...props, loc: { hash: '#B' } });

		expect(scrollTo).not.toHaveBeenCalled();
	});
});
