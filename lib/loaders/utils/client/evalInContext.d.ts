/**
 * Eval example code in a custom context:
 * - `require()` that allows you to require modules from Markdown examples
 *   (won’t work dinamically becasue we need to know all required modules in
 *   advance to be able to bundle them with the code).
 * - `state` variable, `setState` function that will be binded to a React
 *   component that manages example’s state on the frontend.
 *
 * Also prepends a given `code` with a `header` (maps required context modules
 * to local variables: React, current component and modules defined via the
 * `context` config option).
 */
export default function evalInContext(header: string, require: (module: string) => any, code: string): (state: Record<string, unknown>, setState: any) => any;
