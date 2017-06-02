import './styles';
import React from 'react';
import ReactDOM from 'react-dom';
import isFinite from 'lodash/isFinite';
import {
	getInfoFromHash,
	filterComponentExamples,
	filterComponentsInSectionsByExactName,
	filterSections,
	processSections,
	setSlugs,
	slugger,
	removeLoader,
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

	let sections = processSections(styleguide.sections);

	// Parse URL hash to check if the components list must be filtered
	const {
		// Name of the filtered component/section to show isolated (/#!/Button → Button)
		targetName,
		// Index of the fenced block example of the filtered component isolate (/#!/Button/1 → 1)
		targetIndex,
	} = getInfoFromHash();

	let isolatedComponent = false;
	let isolatedExample = false;
	let isolatedSection = false;

	// Filter the requested component id required
	if (targetName) {
		const filteredComponents = filterComponentsInSectionsByExactName(sections, targetName);
		if (filteredComponents.length) {
			sections = [{ components: filteredComponents }];
			isolatedComponent = true;
		} else {
			sections = [filterSections(sections, targetName)];
			isolatedSection = true;
		}

		// If a single component is filtered and a fenced block index is specified hide the other examples
		if (filteredComponents.length === 1 && isFinite(targetIndex)) {
			filteredComponents[0] = filterComponentExamples(filteredComponents[0], targetIndex);
			isolatedExample = true;
		}
	}

	// Reset slugger for each render to be deterministic
	slugger.reset();
	sections = setSlugs(sections);

	const listTypes = sections.map(section => section.name);

	if (window.addEventListener) {
		// W3C standard
		window.addEventListener('load', removeLoader, false); // NB **not** 'onload'
	} else if (window.attachEvent) {
		// Microsoft
		window.attachEvent('onload', removeLoader);
	}

	ReactDOM.render(
		<StyleGuide
			codeKey={codeKey}
			config={styleguide.config}
			welcomeScreen={styleguide.welcomeScreen}
			patterns={styleguide.patterns}
			allSections={sections}
			listTypes={listTypes}
			isolatedComponent={isolatedComponent}
			isolatedExample={isolatedExample}
			isolatedSection={isolatedSection}
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
