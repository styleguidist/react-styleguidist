import path from 'path';
import filter from 'lodash/filter';
import map from 'lodash/map';
import values from 'lodash/values';
import flatten from 'lodash/flatten';
import { generate } from 'escodegen';
import toAst from 'to-ast';
import { builders as b } from 'ast-types';
import chunkify from './utils/chunkify';
import expandDefaultComponent from './utils/expandDefaultComponent';
import getImports from './utils/getImports';
import requireIt from './utils/requireIt';
import resolveESModule from './utils/resolveESModule';
import * as Rsg from '../typings';

const absolutize = (filepath: string) => path.resolve(__dirname, filepath);

const REQUIRE_IN_RUNTIME_PATH = absolutize('utils/client/requireInRuntime');
const EVAL_IN_CONTEXT_PATH = absolutize('utils/client/evalInContext');

export default function examplesLoader(this: Rsg.StyleguidistLoaderContext, source: string) {
	const config = this._styleguidist;
	const { file, displayName, shouldShowDefaultExample, customLangs } = this.getOptions();

	// Replace placeholders (__COMPONENT__) with the passed-in component name
	if (shouldShowDefaultExample) {
		source = expandDefaultComponent(source, displayName);
	}

	const updateExample = config.updateExample
		? (props: Omit<Rsg.CodeExample, 'type'>) => config.updateExample(props, this.resourcePath)
		: undefined;

	// Load examples
	const examples = chunkify(source, updateExample, customLangs);

	// Find all import statements and require() calls in examples to make them
	// available in webpack context at runtime.
	// Note that we can't just use require() directly at runtime,
	// because webpack changes its name to something like __webpack__require__().
	const allCodeExamples = filter(examples, { type: 'code' });
	const requiresFromExamples = allCodeExamples.reduce((requires: string[], example) => {
		return requires.concat(getImports(example.content));
	}, []);

	// Auto imported modules.
	// We don't need to do anything here to support explicit imports: they will
	// work because both imports (generated below and by rewrite-imports) will
	// be eventually transpiled to `var x = require('x')`, so we'll just have two
	// of them in the same scope, which is fine in non-strict mode
	const fullContext = {
		// Modules, provied by the user
		...config.context,
		// Append React, because it’s required for JSX
		React: 'react',
		// Append the current component module to make it accessible in examples
		// without an explicit import
		// TODO: Do not leak absolute path
		...(displayName ? { [displayName]: file } : {}),
	};

	// All required or imported modules, either explicitly in examples code
	// or implicitly (React, current component and context config option)
	const allModules = [...requiresFromExamples, ...values(fullContext)];

	// “Prerequire” modules required in Markdown examples and context so they
	// end up in a bundle and be available at runtime
	const allModulesCode = allModules.reduce(
		(requires: Record<string, Rsg.RequireItResult>, requireRequest) => {
			requires[requireRequest] = requireIt(requireRequest);
			return requires;
		},
		{}
	);

	// Require context modules so they are available in an example
	const requireContextCode = b.program(flatten(map(fullContext, resolveESModule)));

	// Stringify examples object except the evalInContext function
	const examplesWithEval: (Rsg.RuntimeCodeExample | Rsg.MarkdownExample)[] = examples.map(
		(example) => {
			if (example.type === 'code') {
				return { ...example, evalInContext: { toAST: () => b.identifier('evalInContext') } as any };
			} else {
				return example;
			}
		}
	);

	return `
if (module.hot) {
	module.hot.accept([])
}

var requireMap = ${generate(toAst(allModulesCode))};
var requireInRuntimeBase = require(${JSON.stringify(REQUIRE_IN_RUNTIME_PATH)}).default;
var requireInRuntime = requireInRuntimeBase.bind(null, requireMap);
var evalInContextBase = require(${JSON.stringify(absolutize(EVAL_IN_CONTEXT_PATH))}).default;
var evalInContext = evalInContextBase.bind(null, ${JSON.stringify(
		generate(requireContextCode)
	)}, requireInRuntime);

module.exports = ${generate(toAst(examplesWithEval))}
	`;
}
