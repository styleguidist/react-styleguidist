import loaderUtils from 'loader-utils';
import { generate } from 'escodegen';
import toAst from 'to-ast';
import chunkify from './utils/chunkify';
import expandDefaultComponent from './utils/expandDefaultComponent';
import * as Rsg from '../typings';

export default function examplesLoader(this: Rsg.StyleguidistLoaderContext, source: string) {
	const config = this._styleguidist;
	const { displayName, shouldShowDefaultExample, customLangs } = loaderUtils.getOptions(this) || {};

	// Replace placeholders (__COMPONENT__) with the passed-in component name
	if (shouldShowDefaultExample) {
		source = expandDefaultComponent(source, displayName);
	}

	const updateExample = config.updateExample
		? (props: Omit<Rsg.CodeExample, 'type'>) => config.updateExample(props, this.resourcePath)
		: undefined;

	// Load examples
	const examples = chunkify(source, updateExample, customLangs);

	return `
if (module.hot) {
	module.hot.accept([])
}

module.exports = ${generate(toAst(examples))}
	`;
}
