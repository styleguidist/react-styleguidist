import React from 'react';
import ReactDOM from 'react-dom';
import { setComponentsNames, globalizeComponents } from './utils/utils';
import StyleGuide from 'rsg-components/StyleGuide';

import './styles.css';

global.React = React;

if (module.hot) {
	module.hot.accept();
}

// Load styleguide
let { config, components } = require('styleguide!');

components = setComponentsNames(components);
globalizeComponents(components);

ReactDOM.render(<StyleGuide config={config} components={components}/>, document.getElementById('app'));
