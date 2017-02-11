import './styles';
import React from 'react';
import ReactDOM from 'react-dom';
import isFinite from 'lodash/isFinite';
import {
	getComponentNameFromHash,
	filterComponentExamples,
	filterComponentsInSectionsByExactName,
	processComponents,
	processSections,
} from './utils/utils';
import StyleGuide from 'rsg-components/StyleGuide';

// Polyfills
import 'function.name-polyfill';
import es6ObjectAssign from 'es6-object-assign';
es6ObjectAssign.polyfill();

let codeKey = 0;

function renderStyleguide() {
	const styleguide = require('!!../loaders/styleguide-loader!./index.js');

	let isolatedComponent = false;
	let isolatedExample = false;

	let sections = styleguide.sections;

	// If root `components` isn't empty, make it a first section
	const components = processComponents(styleguide.components);
	if (components.length) {
		sections = [{ components }, ...sections];
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
		const filteredComponents = filterComponentsInSectionsByExactName(sections, targetComponentName);
		sections = [{ components: filteredComponents }];
		isolatedComponent = true;

		// if a single component is filtered and a fenced block index is specified hide the other examples
		if (filteredComponents.length === 1 && isFinite(targetComponentIndex)) {
			filteredComponents[0] = filterComponentExamples(filteredComponents[0], targetComponentIndex);
			isolatedExample = true;
		}
	}

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
