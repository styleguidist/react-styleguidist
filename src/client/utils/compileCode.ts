// eslint-disable-next-line import/no-unresolved
import { transform } from 'rsg-compiler';
import insertReturnLastExpression from './insertReturnLastExpression';
import * as Rsg from '../../typings';

const startsWithJsx = (code: string): boolean => !!code.trim().match(/^</);

const wrapCodeInFragment = (code: string): string => `<React.Fragment>${code}</React.Fragment>;`;

/*
 * 1. Wrap code in React Fragment if it starts with JSX element
 * 2. Compile code using given compiler
 * 3. Wrap the last top-level expression in a return statement.
 */
export default function compileCode(
	code: string,
	compilerConfig: Rsg.SanitizedStyleguidistConfig['compilerConfig'],
	onError?: (err: Error) => void
): string {
	const wrappedCode = startsWithJsx(code) ? wrapCodeInFragment(code) : code;
	try {
		const compiledCode = transform(wrappedCode, compilerConfig).code;
		return insertReturnLastExpression(compiledCode);
	} catch (err) {
		if (onError) {
			onError(err);
		}
		return '';
	}
}
