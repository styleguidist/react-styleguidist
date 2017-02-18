'use strict';

const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const HtmlDocument = require('rsg-components/HtmlDocument').default;

module.exports = function({ assets, config, styleguide }) {
	let content = <h1>Loading your styleguide in development mode...</h1>; // TODO: Render Welcome screen

	// When building for production render the styleguide HTML completely
	if (styleguide) {
		const StyleGuide = require('rsg-components/StyleGuide').default;
		content = (
			<StyleGuide
				codeKey={0}
				config={config}
				welcomeScreen={styleguide.welcomeScreen}
				sections={styleguide.sections}
				isolatedComponent={false}
				isolatedExample={false}
			/>
		);
	}

	// TODO: Handle CSS and JS assets separately
	return renderToStaticMarkup(
		<HtmlDocument
			title={config.title}
			assets={assets}
		>
			{ content }
		</HtmlDocument>
	);
};
