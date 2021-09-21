import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.match";
import "core-js/modules/es.string.trim";
import { transform } from 'buble';
import transpileImports from './transpileImports';

var compile = function compile(code, config) {
  return transform(code, config).code;
};

var startsWithJsx = function startsWithJsx(code) {
  return !!code.trim().match(/^</);
};

var wrapCodeInFragment = function wrapCodeInFragment(code) {
  return "<React.Fragment>" + code + "</React.Fragment>;";
};
/*
 * 1. Wrap code in React Fragment if it starts with JSX element
 * 2. Transform import statements into require() calls
 * 3. Compile code using Buble
 */


export default function compileCode(code, compilerConfig, onError) {
  try {
    var wrappedCode = startsWithJsx(code) ? wrapCodeInFragment(code) : code;
    var compiledCode = compile(wrappedCode, compilerConfig);
    return transpileImports(compiledCode);
  } catch (err) {
    if (onError) {
      onError(err);
    }
  }

  return '';
}