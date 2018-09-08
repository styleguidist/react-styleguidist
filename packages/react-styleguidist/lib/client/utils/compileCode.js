import "core-js/modules/es6.regexp.match";
import { transform } from 'buble';
import rewriteImports from 'rewrite-imports';

const compile = function compile(code, config) {
  return transform(code, config).code;
};

const startsWithJsx = function startsWithJsx(code) {
  return !!code.trim().match(/^</);
};

const wrapCodeInFragment = function wrapCodeInFragment(code) {
  return "<React.Fragment>".concat(code, "</React.Fragment>;");
};
/*
 * 1. Wrap code in React Fragment if it starts with JSX element
 * 2. Transform import statements into require() calls
 * 3. Compile code using Buble
 */


export default function compileCode(code, compilerConfig, onError) {
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