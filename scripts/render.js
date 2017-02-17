'use strict';

const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const HTMLDocument = require('react-html-document').default;

let content = <h1>Loading your styleguide in development mode...</h1>; // TODO: Render Welcome screen

// When building for production render the styleguide HTML completely
if (process.env.NODE_ENV === 'production') {
	// TODO: Drop the usage of loader for getting config and sections
	const styleguide = require('!!../loaders/styleguide-loader!./index.js');
	const StyleGuide = require('rsg-components/StyleGuide').default;
	content = (
		<StyleGuide
			codeKey={0}
			config={styleguide.config}
			welcomeScreen={styleguide.welcomeScreen}
			sections={styleguide.sections}
			isolatedComponent={false}
			isolatedExample={false}
		/>
	);
}

module.exports = function({ assets, config }) {
	// TODO: Handle CSS and JS assets separately
	return renderToStaticMarkup(
		<HTMLDocument
			title={ config.title }
			scripts={
				Object
					.keys(assets)
					.map(key => {
						return assets[key].indexOf('server') === -1 ? assets[key] : null;
					})
					.filter(Boolean)
			}
			metatags={[
				{ name: 'charset', content: 'utf-8' },
			]}
		>
			{ content }
		</HTMLDocument>
	);
};
