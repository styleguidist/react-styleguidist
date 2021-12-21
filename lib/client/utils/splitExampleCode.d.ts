/**
 * Take source code and returns:
 * 1. Code before the last top-level expression.
 * 2. Code with the last top-level expression wrapped in a return statement
 *    (kind of an implicit return).
 *
 * Example:
 * var a = 1; React.createElement('i', null, a); // =>
 * 1. var a = 1
 * 2. var a = 1; return (React.createElement('i', null, a));
 */
export default function splitExampleCode(code: string): {
    head: string;
    example: string;
};
