import examplesLoader from '../loaders/examples.loader';

/* eslint max-nested-callbacks: [1, 5] */

describe('examples loader', () => {

	describe('requireAnythingRegex', () => {

		let regex;
		beforeEach(() => {
			expect(examplesLoader.requireAnythingRegex).to.be.an.instanceof(RegExp);
			// We make a version without the /g flag
			regex = new RegExp(examplesLoader.requireAnythingTest);
		});

		it('should match require invocations', () => {
			expect(`require("foo")`).to.match(regex);
			expect(`require ( "foo" )`).to.match(regex);
			expect(`require('foo')`).to.match(regex);
			expect(`require(foo)`).to.match(regex);
			expect(`require("f" + "o" + "o")`).to.match(regex);
			expect(`require("f" + ("o" + "o"))`).to.match(regex);
			expect(`function f() { require("foo"); }`).to.match(regex);
		});

		it('should not match other occurrences of require', () => {
			expect(`"required field"`).not.to.match(regex);
			expect(`var f = require;`).not.to.match(regex);
			expect(`require.call(module, "foo")`).not.to.match(regex);
		});

		it('should match many requires in the same line correctly', () => {
			// Revert to the /g flagged version used by examplesLoader
			regex = new RegExp(examplesLoader.requireAnythingRegex);
			var replaced = `require('foo');require('bar')`.replace(examplesLoader.requireAnythingRegex, 'x');
			expect(replaced).to.equal('x;x');
		});
	});

	describe('simpleStringRegex', () => {
		it('should match simple strings and nothing else', () => {
			let regex = examplesLoader.simpleStringRegex;

			expect(`"foo"`).to.match(regex);
			expect(`'foo'`).to.match(regex);
			expect(`"fo'o"`).to.match(regex);
			expect(`'fo"o'`).to.match(regex);
			expect(`'.,:;!§$&/()=@^12345'`).to.match(regex);

			expect(`foo`).not.to.match(regex);
			expect(`'foo"`).not.to.match(regex);
			expect(`"foo'`).not.to.match(regex);

			// These 2 are actually valid in JS, but don't work with this regex.
			// But you shouldn't be using these in your requires anyway.
			expect(`"fo\\"o"`).not.to.match(regex);
			expect(`'fo\\'o'`).not.to.match(regex);

			expect(`"foo" + "bar"`).not.to.match(regex);
		});
	});

	describe('findRequires', () => {
		it('should find calls to require in code', () => {
			let findRequires = examplesLoader.findRequires;
			expect(findRequires(`require('foo')`)).to.deep.equal(['foo']);
			expect(findRequires(`require('./foo')`)).to.deep.equal(['./foo']);
			expect(findRequires(`require('foo');require('bar')`)).to.deep.equal(['foo', 'bar']);
			expect(() => findRequires(`require('foo' + 'bar')`)).to.throw(Error);
		});
	});

	describe('readExamples', () => {
		it('should separate code and Markdown chunks', () => {
			let examplesMarkdown = `
# header

	<div/>

text with some \`code\`.

\`\`\`
<span/>
\`\`\`
`;
			let examples = examplesLoader.readExamples(examplesMarkdown);
			expect(examples).to.have.length(4);
			expect(examples[0].type).to.equal('markdown');
			expect(examples[1].type).to.equal('code');
			expect(examples[2].type).to.equal('markdown');
			expect(examples[3].type).to.equal('code');
		});

		it('should render fenced blocks with language flag as regular Markdown code snippets with highlighted code', () => {
			let examplesMarkdown = `
# header

\`\`\`javascript
import React from 'react';
\`\`\`

text with some \`code\`.

\`\`\`
<span/>
\`\`\`
`;
			let examples = examplesLoader.readExamples(examplesMarkdown);
			expect(examples).to.have.length(2);
			expect(examples[0].type).to.equal('markdown');
			expect(examples[1].type).to.equal('code');
			expect(examples[0].content).to.equal(`
# header
\`\`\`javascript
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
\`\`\`
text with some \`code\`.
`);
		});
	});

	describe('loader', () => {
		it('should return valid, parsable JS', () => {
			let exampleMarkdown = `
# header

	<div/>

text

\`\`\`
<span/>
\`\`\`
`;
			let output = examplesLoader.call({}, exampleMarkdown);
			expect(() => new Function(output)).not.to.throw(SyntaxError);  // eslint-disable-line no-new-func
		});
	});

	describe('componentName query option', () => {
		it('should replace all occurrences of __COMPONENT__ with provided query.componentName', () => {
			const exampleMarkdown = `
<div>
	<__COMPONENT__>
		<span>text</span>
		<span>Name of component: __COMPONENT__</span>
	</__COMPONENT__>
	<__COMPONENT__ />
</div>
`;

			const output = examplesLoader.call({query: '?componentName=FooComponent'}, exampleMarkdown);
			expect(output).to.not.include('__COMPONENT__');
			expect(output).to.include('FooComponent');
			expect(output.match(/FooComponent/g).length).to.equal(4);
		});
	});

});
