import React, { PropTypes } from 'react';
import HTMLDocument from './HtmlDocumentRenderer';

function getScrtips(assets) {
	return Object
		.keys(assets)
		.map(key => {
			return assets[key].indexOf('server') === -1 ? assets[key] : null;
		})
		.filter(Boolean);
}

function HtmlDocument({ assets = {}, children, title }) {
	// TODO: Handle CSS and JS assets separately
	return (
		<HTMLDocument
			title={ title }
			scripts={getScrtips(assets)}
			stylesheets={assets.stylesheets}
		>
			{ children }
		</HTMLDocument>
	);
}

HtmlDocument.propTypes = {
	assets: PropTypes.object,
	children: PropTypes.node,
	title: PropTypes.string.isRequired,
};

export default HtmlDocument;
