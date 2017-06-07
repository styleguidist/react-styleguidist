import React from 'react';
import PropTypes from 'prop-types';
import TabButton from 'rsg-components/TabButton';

const UsageTabButton = props =>
	<TabButton {...props}>
		Props & methods
	</TabButton>;

UsageTabButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	active: PropTypes.bool,
};

export default UsageTabButton;
