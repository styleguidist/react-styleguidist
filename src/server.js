import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import {
	processSections,
	setSlugs,
} from './utils/utils';
import HtmlDocument from 'rsg-components/HtmlDocument';

module.exports = function({ assets, config }) {
	let content = <h1>Loading your styleguide in development mode...</h1>; // TODO: Render Welcome screen

	// When building for production render the styleguide HTML completely
	if (process.env.NODE_ENV === 'production') {
		const styleguide = require('!!../loaders/styleguide-loader!./index.js');
		const sections = setSlugs(processSections(styleguide.sections), true);
		const StyleGuide = require('rsg-components/StyleGuide').default;
		content = (
			<StyleGuide
				codeKey={0}
				config={config}
				welcomeScreen={styleguide.welcomeScreen}
				sections={sections}
				isolatedComponent={false}
				isolatedExample={false}
			/>
		);
	}

	return '<!doctype html>' + renderToStaticMarkup(
		<HtmlDocument
			title={config.title}
			assets={assets}
		>
			{ content }
		</HtmlDocument>
	);
};
