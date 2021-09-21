import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.match";
import { walk } from 'estree-walker';
import rewriteImports from './rewriteImports';
import getAst from './getAst';

var hasImports = function hasImports(code) {
  return !!code.match(/import[\S\s]+?['"]([^'"]+)['"];?/m);
};
/**
 * Replace ECMAScript imports with require() calls
 */


export default function transpileImports(code) {
  // Don't do anything when the code has nothing that looks like an import
  if (!hasImports(code)) {
    return code;
  } // Ignore errors, they should be caught by Buble


  var ast = getAst(code);

  if (!ast) {
    return code;
  }

  var offset = 0; // estree walkers type is incompatible with acorns output
  // it is working here out of luck and typescript is demonstrating it 
  // we have to go through the any part to keep the nodes with their `node.start`
  // and `node.stop`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any 

  walk(ast, {
    // import foo from 'foo'
    // import 'foo'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    enter: function enter(node) {
      if (node.type === 'ImportDeclaration' && node.source) {
        var start = node.start + offset;
        var end = node.end + offset;
        var statement = code.substring(start, end);
        var transpiledStatement = rewriteImports(statement);
        code = code.substring(0, start) + transpiledStatement + code.substring(end);
        offset += transpiledStatement.length - statement.length;
      }
    }
  });
  return code;
}