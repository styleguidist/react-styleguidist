import React from 'react';
import PropTypes from 'prop-types';
import Props from 'rsg-components/Props';
import Methods from 'rsg-components/Methods';
import UsageRenderer from 'rsg-components/Usage/UsageRenderer';

export default function Usage(component) {
	const { props, methods } = component.props;
	return (
		<UsageRenderer
			props={props && <Props props={props} />}
			methods={methods && methods.length > 0 && <Methods methods={methods} />}
		/>
	);
}

Usage.propTypes = {
	props: PropTypes.shape({
		props: PropTypes.object,
		methods: PropTypes.array,
	}).isRequired,
};
