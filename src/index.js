import React from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import { setComponentsNames, globalizeComponents, promoteInlineExamples, flattenChildren } from './utils/utils';
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
let { config, components, sections } = require('styleguide!');

function processComponents(cs) {
	cs = flattenChildren(cs);
	cs = promoteInlineExamples(cs);
	cs = setComponentsNames(cs);
	globalizeComponents(cs);

	return cs;
}

function processSections(ss) {
	return ss.map(section => {
		section.components = processComponents(section.components || []);
		section.sections = processSections(section.sections || []);

		return section;
	});
}

components = processComponents(components);
sections = processSections(sections || []);

let hasRenderedFullStyleguide = false;
function renderStyleguide() {
	if (window.location.hash.substr(0, 3) === '#!/') {
		const targetComponentName = window.location.hash.substr(3);

		const filteredComponents = _.filter(components, function(component) {
			return component.name === targetComponentName;
		});

		_.forEach(sections, function(section) {
			_.merge(filteredComponents, _.filter(section.components, function(component) {
				return component.name === targetComponentName;
			}));
		});

		ReactDOM.render(
			<StyleGuide
				config={config}
				components={filteredComponents}
				sections={[]}
				sidebar={false}
			/>,
			document.getElementById('app')
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
			document.getElementById('app')
		);
		hasRenderedFullStyleguide = true;
	}
}

window.addEventListener('hashchange', renderStyleguide);
renderStyleguide();
