/* eslint-disable import/first */

import './polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import slots from 'rsg-components/slots';
import StyleGuide from 'rsg-components/StyleGuide';
import getPageTitle from './utils/getPageTitle';
import getRouteData from './utils/getRouteData';
import globalizeComponents from './utils/globalizeComponents';
import './styles';

// Examples code revision to rerender only code examples (not the whole page) when code changes
let codeRevision = 0;

function renderStyleguide() {
	// eslint-disable-next-line import/no-unresolved
	const styleguide = require('!!../loaders/styleguide-loader!./index.js');

	const { hash } = window.location;

	const { sections, displayMode } = getRouteData(styleguide.sections, hash);

	// Update page title
	document.title = getPageTitle(sections, styleguide.config.title, displayMode);

	// If the current hash location was set to just `/` (e.g. when navigating back from isolated view to overview)
	// replace the URL with one without hash, to present the user with a single address of the overview screen
	if (hash === '#/') {
		const url = window.location.pathname + window.location.search;
		history.replaceState('', document.title, url);
	}

	globalizeComponents(sections);

	ReactDOM.render(
		<StyleGuide
			codeRevision={codeRevision}
			config={styleguide.config}
			slots={slots}
			welcomeScreen={styleguide.welcomeScreen}
			patterns={styleguide.patterns}
			sections={sections}
			displayMode={displayMode}
		/>,
		document.getElementById('app')
	);
}

window.addEventListener('hashchange', renderStyleguide);

/* istanbul ignore if */
if (module.hot) {
	module.hot.accept('!!../loaders/styleguide-loader!./index.js', () => {
		codeRevision += 1;
		renderStyleguide();
	});
}

renderStyleguide();
