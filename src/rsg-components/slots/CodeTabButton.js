import React from 'react';
import PropTypes from 'prop-types';
import TabButton from 'rsg-components/TabButton';

const CodeTabButton = ({ active, onClick }) => (
	<TabButton onClick={onClick} active={active}>
		Code
	</TabButton>
);

CodeTabButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	active: PropTypes.bool,
};

export default CodeTabButton;
