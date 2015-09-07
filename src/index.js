// CodeMirror
import 'codemirror/mode/xml/xml';

import React from 'react';
import { setComponentsNames, globalizeComponents } from './utils/utils';
import StyleGuide from './components/StyleGuide';

global.React = React;

// Load components
let components = require('styleguide!');

components = setComponentsNames(components);
globalizeComponents(components);

// console.log('CCC', components);

React.render(<StyleGuide components={components}/>, document.getElementById('app'));
