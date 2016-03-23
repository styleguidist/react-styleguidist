import React from 'react';
import ReactDOM from 'react-dom';
import { setComponentsNames, globalizeComponents } from './utils/utils';
import StyleGuide from 'rsg-components/StyleGuide';
import _ from 'lodash';

import 'highlight.js/styles/tomorrow.css';
import './styles.css';

global.React = React;

if (module.hot) {
	module.hot.accept();
}

// Load style guide
let { config, components } = require('styleguide!');

// If any of the components have multiple children, flatten them.
components = _.flatMap(components, c => {
	if (_.isArray(c.props)) {
		return c.props.map(props => _.extend({}, c, {props: props}));
	}
	else {
		return c;
	}
});

components = setComponentsNames(components);
globalizeComponents(components);

ReactDOM.render(<StyleGuide config={config} components={components}/>, document.getElementById('app'));
