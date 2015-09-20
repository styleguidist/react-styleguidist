import React from 'react';
import { setComponentsNames, globalizeComponents } from './utils/utils';
import StyleGuide from 'components/StyleGuide';

import './styles.css';

global.React = React;

if (module.hot) {
	module.hot.accept();
}

// Load styleguide
let { title, components } = require('styleguide!');

components = setComponentsNames(components);
globalizeComponents(components);

React.render(<StyleGuide title={title} components={components}/>, document.getElementById('app'));
