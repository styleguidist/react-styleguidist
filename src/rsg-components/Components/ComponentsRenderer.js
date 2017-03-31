import React, { PropTypes } from 'react';

export default function ComponentsRenderer({ children }) {
	return (
		<div>
			{children}
		</div>
	);
}
ComponentsRenderer.propTypes = {
	children: PropTypes.node.isRequired,
};
