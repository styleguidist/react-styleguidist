import React, { PropTypes } from 'react';

export default function ComponentsRenderer({ components, sections }) {
	return (
		<div>
			{components}
			{sections}
		</div>
	);
}
ComponentsRenderer.propTypes = {
	components: PropTypes.array.isRequired,
	sections: PropTypes.node.isRequired,
};
