import React from 'react';
import filter from 'lodash/filter';
import ReactDOM from 'react-dom';
import { setComponentsNames, globalizeComponents, promoteInlineExamples, flattenChildren } from './utils/utils';
import StyleGuide from 'rsg-components/StyleGuide';

import 'highlight.js/styles/tomorrow.css';
import './styles.css';

global.React = React;

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

if (window.location.hash.substr(0, 3) === '#!/') {
	const targetComponentName = window.location.hash.substr(3);
	const filteredComponents = filter(components, function (component) {
		return component.name === targetComponentName
	})
	ReactDOM.render(<StyleGuide config={config} components={filteredComponents} sections={[]} />, document.getElementById('app'));
} else {
	ReactDOM.render(<StyleGuide config={config} components={components} sections={sections} />, document.getElementById('app'));
}

