import React from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import { setComponentsNames, globalizeComponents, promoteInlineExamples, flattenChildren } from './utils/utils';
import StyleGuide from 'rsg-components/StyleGuide';

import 'highlight.js/styles/tomorrow.css';

// Make libraries available in examples
global.React = React;
global._ = _;

if (module.hot) {
	module.hot.accept();
}

// Load style guide
let { config, components, sections } = require('styleguide!');

function processComponents(components) {
	components = flattenChildren(components);
	components = promoteInlineExamples(components);
	components = setComponentsNames(components);
	globalizeComponents(components);
	return components;
}

function processSections(sections) {
	return sections.map(section => {
		section.components = processComponents(section.components || []);
		section.sections = processSections(section.sections || []);
		return section;
	});
}

components = processComponents(components);
sections = processSections(sections || []);

let hasRenderedFullStyleguide = false;
function renderStyleguide() {
	const app = document.getElementById('app');

	if (window.location.hash.substr(0, 3) === '#!/') {
		const filterTargetComponents = list => list.filter(component => component.name === targetComponentName);

		const targetComponentName = window.location.hash.substr(3);
		const filteredComponents = filterTargetComponents(components);

		sections.forEach(section => {
			_.merge(filteredComponents, filterTargetComponents(section.components));
		});

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
