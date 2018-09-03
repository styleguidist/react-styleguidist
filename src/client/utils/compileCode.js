// @flow
import { transform } from 'buble';
import rewriteImports from 'rewrite-imports';

const compile = (code: string, config: {}): string => transform(code, config).code;

const startsWithJsx = (code: string): boolean => !!code.trim().match(/^</);

const wrapCodeInFragment = (code: string): string => `<React.Fragment>${code}</React.Fragment>;`;

/*
 * 1. Wrap code in React Fragment if it starts with JSX element
 * 2. Transform import statements into require() calls
 * 3. Compile code using Buble
 */
export default function compileCode(
	code: string,
	compilerConfig: {},
	onError: (err: Error) => void
): string {
	try {
		const wrappedCode = startsWithJsx(code) ? wrapCodeInFragment(code) : code;
		const importsCompiledCode = rewriteImports(wrappedCode);
		return compile(importsCompiledCode, compilerConfig);
	} catch (err) {
		if (onError) {
			onError(err);
		}
	}
	return '';
}
