import examplesLoader from '../examples-loader';

/* eslint-disable no-new-func */

const query = {
	file: '../foo.js',
	displayName: 'FooComponent',
	shouldShowDefaultExample: false,
};

const subComponentQuery = {
	file: '../fooSub.js',
	displayName: 'FooComponent.SubComponent',
	shouldShowDefaultExample: false,
};

const getQueryOptions = (options = {}) => ({ ...query, ...options });
const getSubComponentQueryOptions = (options = {}) => ({ ...subComponentQuery, ...options });

it('should return valid, parsable JS', () => {
	const exampleMarkdown = `
# header

	<div/>

text

\`\`\`
<span/>
\`\`\`
`;
	const result = examplesLoader.call(
		{
			getOptions: () => getQueryOptions(),
			_styleguidist: {},
		} as any,
		exampleMarkdown
	);

	expect(result).toBeTruthy();
	expect(() => new Function(result)).not.toThrowError(SyntaxError);
});

it('should replace all occurrences of __COMPONENT__ with provided query.displayName', () => {
	const exampleMarkdown = `
<div>
	<__COMPONENT__>
		<span>text</span>
		<span>Name of component: __COMPONENT__</span>
	</__COMPONENT__>
	<__COMPONENT__ />
</div>
`;

	const result = examplesLoader.call(
		{
			getOptions: () => getQueryOptions({ shouldShowDefaultExample: true }),
			_styleguidist: {},
		} as any,
		exampleMarkdown
	);
	expect(result).not.toMatch(/__COMPONENT__/);
	const componentHtml = result.match(/<div>(.*?)<\/div>/);
	expect(componentHtml && componentHtml[0]).toMatchInlineSnapshot(
		`"<div>\\\\n\\\\t<FooComponent>\\\\n\\\\t\\\\t<span>text</span>\\\\n\\\\t\\\\t<span>Name of component: FooComponent</span>\\\\n\\\\t</FooComponent>\\\\n\\\\t<FooComponent />\\\\n</div>"`
	);
});

it('should pass updateExample function from config to chunkify', () => {
	const exampleMarkdown = `
\`\`\`jsx static
<h1>Hello world!</h2>
\`\`\`
`;
	const updateExample = jest.fn((props) => props);
	examplesLoader.call(
		{
			getOptions: () => getQueryOptions(),
			resourcePath: '/path/to/foo/examples/file',
			_styleguidist: {
				updateExample,
			},
		} as any,
		exampleMarkdown
	);
	expect(updateExample).toBeCalledWith(
		{
			content: '<h1>Hello world!</h2>',
			settings: { static: true },
			lang: 'jsx',
		},
		'/path/to/foo/examples/file'
	);
});

it('should generate require map when require() is used', () => {
	const exampleMarkdown = `
One:

    const _ = require('lodash');
	<X/>

Two:

	<Y/>
`;
	const result = examplesLoader.call(
		{
			getOptions: () => getQueryOptions(),
			_styleguidist: {},
		} as any,
		exampleMarkdown
	);

	expect(result).toBeTruthy();
	expect(() => new Function(result)).not.toThrowError(SyntaxError);
	expect(result).toMatch(`'lodash': require('lodash')`);
	expect(result).toMatch(`'react': require('react')`);
});

it('should generate require map when import is used', () => {
	const exampleMarkdown = `
One:

    import _ from 'lodash';
	<X/>
`;
	const result = examplesLoader.call(
		{
			getOptions: () => getQueryOptions(),
			_styleguidist: {},
		} as any,
		exampleMarkdown
	);

	expect(result).toBeTruthy();
	expect(() => new Function(result)).not.toThrowError(SyntaxError);
	expect(result).toMatch(`'lodash': require('lodash')`);
	expect(result).toMatch(`'react': require('react')`);
});

it('should work with multiple JSX element on the root level', () => {
	const exampleMarkdown = `
	<X/>
	<Y/>
`;
	const result = examplesLoader.call(
		{
			getOptions: () => getQueryOptions(),
			_styleguidist: {},
		} as any,
		exampleMarkdown
	);

	expect(result).toBeTruthy();
	expect(() => new Function(result)).not.toThrowError(SyntaxError);
});

it('should prepend example code with React require()', () => {
	const exampleMarkdown = `<X/>`;
	const result = examplesLoader.call(
		{
			getOptions: () => getQueryOptions(),
			_styleguidist: {},
		} as any,
		exampleMarkdown
	);

	expect(result).toBeTruthy();
	expect(() => new Function(result)).not.toThrowError(SyntaxError);
	expect(result).toMatch(
		`const React$0 = require('react');\\nconst React = React$0.default || (React$0['React'] || React$0);`
	);
});

it('should prepend example code with component require()', () => {
	const exampleMarkdown = `<X/>`;
	const result = examplesLoader.call(
		{
			getOptions: () => getQueryOptions(),
			_styleguidist: {},
		} as any,
		exampleMarkdown
	);

	expect(result).toBeTruthy();
	expect(() => new Function(result)).not.toThrowError(SyntaxError);
	expect(result).toMatch(
		`const FooComponent$0 = require('../foo.js');\\nconst FooComponent = FooComponent$0.default || (FooComponent$0['FooComponent'] || FooComponent$0);`
	);
});

it('should prepend example code with root component require() for sub components', () => {
	const exampleMarkdown = `<X/>`;
	const result = examplesLoader.call(
		{
			getOptions: () => getSubComponentQueryOptions(),
			_styleguidist: {},
		} as any,
		exampleMarkdown
	);

	expect(result).toBeTruthy();
	expect(() => new Function(result)).not.toThrowError(SyntaxError);
	expect(result).toMatch(
		`const FooComponentSubComponent$0 = require('../fooSub.js');\\nconst FooComponentSubComponent = FooComponentSubComponent$0.default || (FooComponentSubComponent$0['FooComponentSubComponent'] || FooComponentSubComponent$0);`
	);
});

it('should allow explicit import of React and component module', () => {
	const exampleMarkdown = `
    import React from 'react';
    import FooComponent from '../foo.js';
    <FooComponent/>`;
	const result = examplesLoader.call(
		{
			getOptions: () => getQueryOptions(),
			_styleguidist: {},
		} as any,
		exampleMarkdown
	);

	expect(result).toBeTruthy();
	expect(() => new Function(result)).not.toThrowError(SyntaxError);
	expect(result).toMatch(
		`const React$0 = require('react');\\nconst React = React$0.default || (React$0['React'] || React$0);`
	);
	expect(result).toMatch(
		`const FooComponent$0 = require('../foo.js');\\nconst FooComponent = FooComponent$0.default || (FooComponent$0['FooComponent'] || FooComponent$0);`
	);
});

it('should works for any Markdown file, without a current component', () => {
	const exampleMarkdown = `
    import React from 'react';
    import FooComponent from '../foo.js';
    <FooComponent/>`;
	const result = examplesLoader.call(
		{
			getOptions: () => ({}),
			_styleguidist: {},
		} as any,
		exampleMarkdown
	);

	expect(result).toBeTruthy();
	expect(() => new Function(result)).not.toThrowError(SyntaxError);
	expect(result).toMatch(
		`const React$0 = require('react');\\nconst React = React$0.default || (React$0['React'] || React$0);`
	);
	expect(result).not.toMatch('undefined');
});
