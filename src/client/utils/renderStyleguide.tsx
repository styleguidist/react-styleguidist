import React from 'react';
import hashSum from 'hash-sum';
import slots from 'rsg-components/slots';
import StyleGuide from 'rsg-components/StyleGuide';
import getPageTitle from './getPageTitle';
import getRouteData from './getRouteData';
import processSections from './processSections';
import * as Rsg from '../../typings';

interface StyleguideObject {
	sections: Rsg.Section[];
	config: Rsg.ProcessedStyleguidistConfig;
	patterns: string[];
	welcomeScreen?: boolean;
}

/**
 * @param {object} styleguide An object returned by styleguide-loader
 * @param {number} codeRevision
 * @param {Location} [loc]
 * @param {Document} [doc]
 * @param {History} [hist]
 * @return {React.ReactElement}
 */
export default function renderStyleguide(
	styleguide: StyleguideObject,
	codeRevision: number,
	loc: { hash: string; pathname: string; search: string } = window.location,
	doc: { title: string } = document,
	hist: { replaceState: (name: string, title: string, url: string) => void } = window.history
): React.ReactElement {
	const allSections = processSections(styleguide.sections, {
		useRouterLinks: styleguide.config.pagePerSection,
	});

	const { title, pagePerSection, theme, styles } = styleguide.config;
	const { sections, displayMode } = getRouteData(allSections, loc.hash, pagePerSection);

	// Update page title
	doc.title = getPageTitle(sections, title, displayMode);

	// If the current hash location was set to just `/` (e.g. when navigating back from isolated view to overview)
	// replace the URL with one without hash, to present the user with a single address of the overview screen
	if (loc.hash === '#/') {
		const url = loc.pathname + loc.search;
		hist.replaceState('', doc.title, url);
	}

	return (
		<StyleGuide
			codeRevision={codeRevision}
			// only caclulate css revisions in dev when hot is on to avoid
			// stringifying the styles in production
			cssRevision={module.hot ? hashSum({ theme, styles }) : '0'}
			config={styleguide.config}
			slots={slots(styleguide.config)}
			welcomeScreen={styleguide.welcomeScreen}
			patterns={styleguide.patterns}
			sections={sections}
			allSections={allSections}
			displayMode={displayMode}
			pagePerSection={pagePerSection}
		/>
	);
}
