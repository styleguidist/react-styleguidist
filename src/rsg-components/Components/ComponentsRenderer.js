import React from 'react';
import PropTypes from 'prop-types';

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
