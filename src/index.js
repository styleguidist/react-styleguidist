import React from 'react';
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

ReactDOM.render(<StyleGuide config={config} components={components} sections={sections} />, document.getElementById('app'));
