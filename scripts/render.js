'use strict';

const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const HTMLDocument = require('react-html-document').default;

let content = <h1>Loading your styleguide in development mode...</h1>; // TODO: Render Welcome screen

module.exports = function({ assets, config, styleguide }) {
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
