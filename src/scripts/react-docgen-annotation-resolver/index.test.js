const { NodePath, namedTypes } = require('ast-types');
const { parse } = require('@babel/parser');
const annotationResolver = require('./');

describe('annotationResolver', () => {
	function parseSource(source) {
		return annotationResolver(
			parse(source, {
				ranges: true,
				sourceType: 'module',
				plugins: ['jsx'],
			})
		);
	}

	describe('annotated export', () => {
		test('finds annoted export Stateful', () => {
			const source = `
        import React from "react";

        const Component = React.createClass({});

        /**
         * @component
         */
        export default Component;
      `;

			const result = parseSource(source);
			expect(Array.isArray(result)).toBe(true);
			expect(result.length).toBe(1);
			expect(result[0] instanceof NodePath).toBe(true);
			expect(result[0].node.callee.object.name).toBe('React');
		});
		test('finds annoted export Stateless', () => {
			const source = `
        import React from "react";

        const Component = () => <div />;

        /**
         * @component
         */
        export default Component;
      `;

			const result = parseSource(source);
			expect(Array.isArray(result)).toBe(true);
			expect(result.length).toBe(1);
			expect(result[0] instanceof NodePath).toBe(true);
			expect(namedTypes.ArrowFunctionExpression.check(result[0].node)).toBe(true);
		});
		test('finds annotated export Stateful wrapped in HOC', () => {
			const source = `
        import React from "react";

        const Component = React.createClass({});

        /**
         * @component
         */
        export default connect(mapStateToProps, Component);
      `;

			const result = parseSource(source);
			expect(Array.isArray(result)).toBe(true);
			expect(result.length).toBe(1);
			expect(result[0] instanceof NodePath).toBe(true);
			expect(result[0].node.callee.object.name).toBe('React');
		});
		test('finds annotated export Stateless wrapped in HOC', () => {
			const source = `
        import React from "react";

        const Component = () => <div />;

        /**
         * @component
         */
        export default connect(mapStateToProps, Component);
      `;

			const result = parseSource(source);
			expect(Array.isArray(result)).toBe(true);
			expect(result.length).toBe(1);
			expect(result[0] instanceof NodePath).toBe(true);
			expect(namedTypes.ArrowFunctionExpression.check(result[0].node)).toBe(true);
		});
		test('Does not find if not annotated Stateless', () => {
			const source = `
        import React from "react";

        const Component = () => <div />;

        export default Component;
      `;

			const result = parseSource(source);
			expect(Array.isArray(result)).toBe(true);
			expect(result.length).toBe(0);
		});
		test('does not find if not annoted export Stateful', () => {
			const source = `
        import React from "react";

        const Component = React.createClass({});

        export default Component;
      `;

			const result = parseSource(source);
			expect(Array.isArray(result)).toBe(true);
			expect(result.length).toBe(0);
		});
	});
});
