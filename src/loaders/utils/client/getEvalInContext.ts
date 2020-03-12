/**
 * Returns a function that evals the example code in a given `require()`
 * function that allows you to require modules from Markdown examples (this
 * won’t work dinamically becasue we need to know all required modules in
 * advance to be able to bundle them with the code).
 *
 * Also prepends a given `code` with a `header` that maps required context
 * modules to local variables: React, current component and modules defined
 * via the `context` config option.
 */
export default function getEvalInContext(
	header: string,
	require: (module: string) => any,
	code: string
): () => React.ReactElement {
	// 1. Prepend code with the header
	// 2. Wrap code in a block (`{}`) to create a new scope, so you could
	//    explicitly import context modules in your examples)
	const body = `${header}{${code}}`;

	// eslint-disable-next-line no-new-func
	const func = new Function('require', body);

	// Define custom name instead of default `anonymous`
	Object.defineProperty(func, 'name', { value: 'evalInContext(Example)', writable: false });

	// Bind the `require` function
	return func.bind(null, require);
}
