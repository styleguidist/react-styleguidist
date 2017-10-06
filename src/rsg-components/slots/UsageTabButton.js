import React from 'react';
import PropTypes from 'prop-types';
import TabButton from 'rsg-components/TabButton';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/lib/md';

const iconSize = {
	width: '20px',
	height: '20px',
};

const UsageTabButton = props => {
	const component = props.props;
	const showButton = component.props || (component.methods && component.methods.length > 0);
	return showButton ? (
		<TabButton {...props}>
			Props & methods
			{props.active ? <MdKeyboardArrowUp {...iconSize} /> : <MdKeyboardArrowDown {...iconSize} />}
		</TabButton>
	) : null;
};

UsageTabButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	props: PropTypes.shape({
		props: PropTypes.object,
		methods: PropTypes.array,
	}).isRequired,
	active: PropTypes.bool,
};

export default UsageTabButton;
