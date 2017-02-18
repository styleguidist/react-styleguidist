import React, { PropTypes } from 'react';
import HTMLDocument from 'react-html-document';

function getScrtips(assets) {
	return Object
		.keys(assets)
		.map(key => {
			return assets[key].indexOf('server') === -1 ? assets[key] : null;
		})
		.filter(Boolean);
}

function HtmlDocumentRenderer({ assets = {}, children, title }) {
	return (
		<HTMLDocument
			title={ title }
			scripts={getScrtips(assets)}
			metatags={[
				{ name: 'charset', content: 'utf-8' },
			]}
		>
			{ children }
		</HTMLDocument>
	);
}

HtmlDocumentRenderer.propTypes = {
	assets: PropTypes.object,
	children: PropTypes.node,
	title: PropTypes.string.isRequired,
};

export default HtmlDocumentRenderer;
