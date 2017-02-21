import './styles';
import React from 'react';
import ReactDOM from 'react-dom';
import isFinite from 'lodash/isFinite';
import {
	getComponentNameFromHash,
	filterComponentExamples,
	filterComponentsInSectionsByExactName,
	processSections,
	setSlugs,
} from './utils/utils';
import StyleGuide from 'rsg-components/StyleGuide';

// Polyfills
import 'function.name-polyfill';
import es6ObjectAssign from 'es6-object-assign';
es6ObjectAssign.polyfill();

// Examples code revision to rerender only code examples (not the whole page) when code changes
let codeKey = 0;

function renderStyleguide() {
	const styleguide = require('!!../loaders/styleguide-loader!./index.js');
	let sections = setSlugs(processSections(styleguide.sections), true);

	// Parse URL hash to check if the components list must be filtered
	const {
		// Name of the filtered component to show isolated (/#!/Button → Button)
		targetComponentName,
		// Index of the fenced block example of the filtered component isolate (/#!/Button/1 → 1)
		targetComponentIndex,
	} = getComponentNameFromHash();

	let isolatedComponent = false;
	let isolatedExample = false;

	// Filter the requested component id required
	if (targetComponentName) {
		const filteredComponents = filterComponentsInSectionsByExactName(sections, targetComponentName);
		sections = [{ components: filteredComponents }];
		isolatedComponent = true;

		// If a single component is filtered and a fenced block index is specified hide the other examples
		if (filteredComponents.length === 1 && isFinite(targetComponentIndex)) {
			filteredComponents[0] = filterComponentExamples(filteredComponents[0], targetComponentIndex);
			isolatedExample = true;
		}
	}

	ReactDOM.render(
		<StyleGuide
			codeKey={codeKey}
			config={styleguide.config}
			welcomeScreen={styleguide.welcomeScreen}
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
