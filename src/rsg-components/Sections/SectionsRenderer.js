import React, { PropTypes } from 'react';

export default function SectionsRenderer({ children }) {
	return (
		<article>
			{children}
		</article>
	);
}

SectionsRenderer.propTypes = {
	children: PropTypes.node,
};
