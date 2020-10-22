// eslint-disable-next-line import/no-unresolved
import * as compiler from 'rsg-compiler';
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
	compileExample: Rsg.SanitizedStyleguidistConfig['compileExample']
): string {
	const wrappedCode = startsWithJsx(code) ? wrapCodeInFragment(code) : code;
	const compiledCode = compileExample(compiler, wrappedCode);
	return insertReturnLastExpression(compiledCode);
}
