import React from 'react';
import PropTypes from 'prop-types';
import TabButton from 'rsg-components/TabButton';

const UsageTabButton = props => {
	const component = props.props;
	const showButton = component.props || (component.methods && component.methods.length > 0);
	return showButton
		? <TabButton {...props}>
				Props & methods
			</TabButton>
		: null;
};

UsageTabButton.propTypes = {
	props: PropTypes.shape({
		props: PropTypes.object,
		methods: PropTypes.array,
	}).isRequired,
};

export default UsageTabButton;
