import React, { PropTypes } from 'react';

export default function ComponentsRenderer({ children }) {
	return (
		<section>
			{children}
		</section>
	);
}
ComponentsRenderer.propTypes = {
	children: PropTypes.node.isRequired,
};
