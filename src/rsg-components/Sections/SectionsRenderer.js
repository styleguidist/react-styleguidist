import React, { PropTypes } from 'react';

export default function SectionsRenderer({ children }) {
	return (
		<section>
			{children}
		</section>
	);
}

SectionsRenderer.propTypes = {
	children: PropTypes.node,
};
