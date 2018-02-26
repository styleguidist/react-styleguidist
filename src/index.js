/* eslint-disable import/first */

import './polyfills';
import './styles';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './rsg-components/App';

// Examples code revision to rerender only code examples (not the whole page) when code changes
// eslint-disable-next-line no-unused-vars
let codeRevision = 0;

const render = () => {
	// eslint-disable-next-line import/no-unresolved
	const styleguide = require('!!../loaders/styleguide-loader!./index.js');
	ReactDOM.render(
		<App styleguide={styleguide} codeRevision={codeRevision} />,
		document.getElementById('app')
	);
};

window.addEventListener('hashchange', render);

/* istanbul ignore if */
if (module.hot) {
	module.hot.accept('!!../loaders/styleguide-loader!./index.js', () => {
		codeRevision += 1;
		render();
	});
}

render();
