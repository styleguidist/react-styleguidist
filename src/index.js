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

let hasRenderedFullStyleguide = false;
let codeKey = 0;

function renderStyleguide() {
	const styleguide = require('styleguide!index.js');
	const config = {
		...styleguide.config,
		codeKey,
	};
	const components = processComponents(styleguide.components);
	const sections = processSections(styleguide.sections || []);

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

if (module.hot) {
	module.hot.accept('styleguide!index.js', () => {
		codeKey += 1;
		hasRenderedFullStyleguide = false;
		renderStyleguide();
	});
}

renderStyleguide();
