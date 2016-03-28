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
let { config, components } = require('styleguide!');

components = flattenChildren(components);
components = promoteInlineExamples(components);
components = setComponentsNames(components);
globalizeComponents(components);

ReactDOM.render(<StyleGuide config={config} components={components}/>, document.getElementById('app'));
