import React from 'react';
import PropTypes from 'prop-types';
import Props from 'react-styleguidist-plugin-props'
import Methods from 'react-styleguidist-plugin-methods'

export default function Usage({ props: { props, methods } }) {
	const propsNode = props && <Props props={props} />;
	const methodsNode = methods && methods.length > 0 && <Methods methods={methods} />;

	if (!propsNode && !methodsNode) {
		return null;
	}

	return (
		<div>
			{propsNode}
			{methodsNode}
		</div>
	);
}

Usage.propTypes = {
	props: PropTypes.shape({
		props: PropTypes.array,
		methods: PropTypes.array,
	}).isRequired,
};
