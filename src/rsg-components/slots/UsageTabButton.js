import React from 'react';
import PropTypes from 'prop-types';
import TabButton from 'rsg-components/TabButton';

const UsageTabButton = props => {
	const component = props.props;
	const hasMethods = component.methods && component.methods.length > 0;
	const showButton = component.props || hasMethods;
	return (
		showButton &&
		<TabButton {...props}>
			Props & methods
		</TabButton>
	);
};

UsageTabButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	active: PropTypes.bool,
};

export default UsageTabButton;
