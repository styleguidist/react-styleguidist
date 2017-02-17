'use strict';

const React = require('react');
const { renderToString } = require('react-dom/server');
const StyleGuide = require('rsg-components/StyleGuide').default;
const styleguide = require('!!../loaders/styleguide-loader!./index.js');

module.exports = function() {
	return renderToString(
		<StyleGuide
			codeKey={0}
			config={styleguide.config}
			welcomeScreen={styleguide.welcomeScreen}
			sections={styleguide.sections}
			isolatedComponent={false}
			isolatedExample={false}
		/>
	);
};
