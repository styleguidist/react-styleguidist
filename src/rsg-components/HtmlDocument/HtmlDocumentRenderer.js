import React, { PropTypes } from 'react';
import HTMLDocument from 'react-html-document';

function HtmlDocumentRenderer({ children, scripts, stylesheets, ...props }) {
	return (
		<HTMLDocument
			{...props}
			scripts={scripts}
			stylesheets={stylesheets}
		>
			{ children }
		</HTMLDocument>
	);
}

HtmlDocumentRenderer.propTypes = {
	scripts: PropTypes.array,
	stylesheets: PropTypes.array,
	children: PropTypes.node,
	title: PropTypes.string.isRequired,
};

export default HtmlDocumentRenderer;
