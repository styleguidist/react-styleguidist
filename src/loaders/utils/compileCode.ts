import insertReturnLastExpression from './insertReturnLastExpression';

const startsWithJsx = (code: string): boolean => !!code.trim().match(/^</);

const wrapCodeInFragment = (code: string): string => `<React.Fragment>${code}</React.Fragment>;`;

/*
 * 1. Wrap code in React Fragment if it starts with JSX element
 * 2. Compile code using given compiler
 * 3. Wrap the last top-level expression in a return statement.
 */
export default function compileCode(
	code: string,
	compiler: (code: string, compilerConfig: any) => { code: string },
	compilerConfig: Rsg.SanitizedStyleguidistConfig['compilerConfig']
): string {
	const wrappedCode = startsWithJsx(code) ? wrapCodeInFragment(code) : code;
	const compiledCode = compiler(wrappedCode, compilerConfig).code;
	return insertReturnLastExpression(compiledCode);
}
