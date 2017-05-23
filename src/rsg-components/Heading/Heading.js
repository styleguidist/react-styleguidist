import React from 'react';
import PropTypes from 'prop-types';
import Slot from 'rsg-components/Slot';
import HeadingRenderer from 'rsg-components/Heading/HeadingRenderer';

export default function Heading({ slotName, slotProps, children, ...rest }) {
	return (
		<HeadingRenderer toolbar={<Slot name={slotName} props={slotProps} />} {...rest}>
			{children}
		</HeadingRenderer>
	);
}

Heading.propTypes = {
	children: PropTypes.node,
	id: PropTypes.string.isRequired,
	slotName: PropTypes.string.isRequired,
	slotProps: PropTypes.object.isRequired,
	primary: PropTypes.bool,
	deprecated: PropTypes.bool,
};
