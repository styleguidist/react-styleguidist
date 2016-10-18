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

let codeKey = 0;

function renderStyleguide() {
	const styleguide = require('styleguide!index.js');
	const config = {
		...styleguide.config,
		codeKey,
	};

	let components = processComponents(styleguide.components);
	let sections = processSections(styleguide.sections || []);
	let sidebar = true;

	if (window.location.hash.substr(0, 3) === '#!/') {
		const targetComponentName = window.location.hash.substr(3);
		components = [
			...filterComponentsByExactName(components, targetComponentName),
			...filterComponentsInSectionsByExactName(sections, targetComponentName),
		];
		sections = [];
		sidebar = false;
	}

	ReactDOM.render(
		<StyleGuide
			config={config}
			components={components}
			sections={sections}
			sidebar={sidebar}
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
