// CodeMirror
import 'codemirror/mode/xml/xml';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-light.css';

import React from 'react';
import { setComponentsNames, globalizeComponents } from './utils/utils';
import StyleGuide from 'components/StyleGuide/StyleGuide';

import './styles.css';

global.React = React;

if (module.hot) {
	module.hot.accept();
}

// Load components
let components = require('styleguide!');

components = setComponentsNames(components);
globalizeComponents(components);

// console.log('CCC', components);

React.render(<StyleGuide components={components}/>, document.getElementById('app'));
