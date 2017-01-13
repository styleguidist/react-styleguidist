import React from 'react';
import _ from 'lodash';
import isFinite from 'lodash/isFinite';
import ReactDOM from 'react-dom';
import {
	getComponentNameFromHash,
	filterComponentsByExactName,
	filterComponentExamples,
	filterComponentsInSectionsByExactName,
	processComponents,
	processSections,
} from './utils/utils';
import StyleGuide from 'rsg-components/StyleGuide';

import 'highlight.js/styles/tomorrow.css';
import './styles.css';
import es6ObjectAssign from 'es6-object-assign';

es6ObjectAssign.polyfill();

// Make libraries available in examples
global.React = React;
global._ = _;

let codeKey = 0;

function renderStyleguide() {
	const styleguide = require('styleguide!index.js');

	let components = processComponents(styleguide.components);
	let sections = processSections(styleguide.sections || []);
	let sidebar = true;
	let singleExample = false;

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
		sections = [];
		sidebar = false;

		// if a single component is filtered and a fenced block index is specified hide the other examples
		if (components.length === 1 && isFinite(targetComponentIndex)) {
			components[0] = filterComponentExamples(components[0], targetComponentIndex);
			singleExample = true;
		}
	}

	ReactDOM.render(
		<StyleGuide
			codeKey={codeKey}
			config={styleguide.config}
			components={components}
			sections={sections}
			sidebar={sidebar}
			singleExample={singleExample}
		/>,
		document.getElementById('app')
	);
}

window.addEventListener('hashchange', renderStyleguide);

if (module.hot) {
	module.hot.accept('styleguide!index.js', () => {
		codeKey += 1;
		renderStyleguide();
	});
}

renderStyleguide();
