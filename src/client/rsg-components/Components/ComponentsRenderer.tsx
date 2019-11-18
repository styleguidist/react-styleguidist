import React from 'react';
import PropTypes from 'prop-types';

export default function ComponentsRenderer({ children }: { children: React.ReactNode }) {
	return <div>{children}</div>;
}
ComponentsRenderer.propTypes = {
	children: PropTypes.node.isRequired,
};
