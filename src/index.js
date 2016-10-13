import React from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import {
	filterComponentsByExactName,
	filterComponentsInSectionsByExactName,
	processComponents,
	processSections,
} from './utils/utils';
import StyleGuide from 'rsg-components/StyleGuide';

import 'highlight.js/styles/tomorrow.css';
import './styles.css';

// Make libraries available in examples
global.React = React;
global._ = _;

// Load style guide
let config;
let components;
let sections;
let hasRenderedFullStyleguide;
let key = 0;

function loadStyleguide() {
	const styleguide = require('styleguide!index.js');
	config = styleguide.config;
	components = processComponents(styleguide.components);
	sections = processSections(styleguide.sections || []);
	hasRenderedFullStyleguide = false;
	key += 1;
}

if (module.hot) {
	module.hot.accept('styleguide!index.js', () => {
		loadStyleguide();
		renderStyleguide();
	});
}

function renderStyleguide() {
	const app = document.getElementById('app');

	if (window.location.hash.substr(0, 3) === '#!/') {
		const targetComponentName = window.location.hash.substr(3);

		const filteredComponents = [
			...filterComponentsByExactName(components, targetComponentName),
			...filterComponentsInSectionsByExactName(sections, targetComponentName),
		];

		ReactDOM.render(
			<StyleGuide
				key={key}
				config={config}
				components={filteredComponents}
				sections={[]}
				sidebar={false}
			/>,
			app
		);
		hasRenderedFullStyleguide = false;
	}
	else if (!hasRenderedFullStyleguide) {
		ReactDOM.render(
			<StyleGuide
				key={key}
				config={config}
				components={components}
				sections={sections}
			/>,
			app
		);
		hasRenderedFullStyleguide = true;
	}
}

window.addEventListener('hashchange', renderStyleguide);

loadStyleguide();
renderStyleguide();
