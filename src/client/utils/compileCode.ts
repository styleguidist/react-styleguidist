import { transform, TransformOptions } from 'buble';
import transpileImports from './transpileImports';

const compile = (code: string, config: TransformOptions): string => transform(code, config).code;

const startsWithJsx = (code: string): boolean => !!code.trim().match(/^</);

const wrapCodeInFragment = (code: string): string => `<React.Fragment>${code}</React.Fragment>;`;

/*
 * 1. Wrap code in React Fragment if it starts with JSX element
 * 2. Transform import statements into require() calls
 * 3. Compile code using Buble
 */
export default function compileCode(
	code: string,
	compilerConfig: TransformOptions,
	onError?: (err: Error) => void
): string {
	try {
		let compiledCode;

		try {
			compiledCode = compile(code, compilerConfig);
		} catch (err) {
			if (
				err instanceof SyntaxError &&
				err.message.startsWith('Adjacent JSX elements must be wrapped in an enclosing tag')
			) {
				const wrappedCode = startsWithJsx(code) ? wrapCodeInFragment(code) : code;
				compiledCode = compile(wrappedCode, compilerConfig);
			} else if (onError && err instanceof Error) {
				onError(err);
			}
		}

		return compiledCode ? transpileImports(compiledCode) : '';
	} catch (err) {
		if (onError && err instanceof Error) {
			onError(err);
		}
	}
	return '';
}
