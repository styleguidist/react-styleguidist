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

if (module.hot) {
	module.hot.accept();
}

// Load style guide
let { config, components, sections } = require('styleguide!index.js');

components = processComponents(components);
sections = processSections(sections || []);

let hasRenderedFullStyleguide = false;
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

renderStyleguide();
