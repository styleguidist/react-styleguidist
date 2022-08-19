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
		const wrappedCode = startsWithJsx(code) ? wrapCodeInFragment(code) : code;
		const compiledCode = compile(wrappedCode, compilerConfig);
		return transpileImports(compiledCode);
	} catch (err) {
		if (onError && err instanceof Error) {
			onError(err);
		}
	}
	return '';
}
