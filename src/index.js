import React from 'react';
import { setComponentsNames, globalizeComponents } from './utils/utils';
import StyleGuide from 'components/StyleGuide';

import './styles.css';

global.React = React;

if (module.hot) {
	module.hot.accept();
}

// Load styleguide
let { config, components } = require('styleguide!');

components = setComponentsNames(components);
globalizeComponents(components);

React.render(<StyleGuide config={config} components={components}/>, document.getElementById('app'));
