import './styles';
import React from 'react';
import ReactDOM from 'react-dom';
import isFinite from 'lodash/isFinite';
import es6ObjectAssign from 'es6-object-assign';
import {
	getComponentNameFromHash,
	filterComponentsByExactName,
	filterComponentExamples,
	filterComponentsInSectionsByExactName,
	processComponents,
	processSections,
	setSlugs,
	slugger,
} from './utils/utils';
import StyleGuide from 'rsg-components/StyleGuide';
import 'function.name-polyfill';

es6ObjectAssign.polyfill();

let codeKey = 0;

function renderStyleguide() {
	const styleguide = require('!!../loaders/styleguide-loader!./index.js');

	let isolatedComponent = false;
	let isolatedExample = false;
	let components = processComponents(styleguide.components);
	let sections = styleguide.sections;

	// If root `components` isn't empty, make it a first section
	if (components.length) {
		sections.unshift({ components });
	}

	sections = processSections(sections);

	// parse url hash to check if the components list must be filtered
	const {
		// name of the filtered component to show isolated
		targetComponentName,
		// index of the fenced block example of the filtered component isolate
		targetComponentIndex,
	} = getComponentNameFromHash();

	// filter the requested component id required
	if (targetComponentName) {
		components = [
			...filterComponentsByExactName(components, targetComponentName),
			...filterComponentsInSectionsByExactName(sections, targetComponentName),
		];
		sections = [{ components }];
		isolatedComponent = true;

		// if a single component is filtered and a fenced block index is specified hide the other examples
		if (components.length === 1 && isFinite(targetComponentIndex)) {
			components[0] = filterComponentExamples(components[0], targetComponentIndex);
			isolatedExample = true;
		}
	}

	// Reset slugger for each render to be deterministic
	slugger.reset();
	sections = setSlugs(sections);

	ReactDOM.render(
		<StyleGuide
			codeKey={codeKey}
			config={styleguide.config}
			sections={sections}
			isolatedComponent={isolatedComponent}
			isolatedExample={isolatedExample}
		/>,
		document.getElementById('app')
	);
}

window.addEventListener('hashchange', renderStyleguide);

/* istanbul ignore if */
if (module.hot) {
	module.hot.accept('!!../loaders/styleguide-loader!./index.js', () => {
		codeKey += 1;
		renderStyleguide();
	});
}

renderStyleguide();
