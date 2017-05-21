// Inspired by https://github.com/camwest/react-slot-fill

import React from 'react';
import PropTypes from 'prop-types';

export default function Slot({ name, className, props }, { slots }) {
	const rendered = slots[name].map((Fill, index) => Fill && <Fill key={index} {...props} />);
	const filtered = rendered.filter(Boolean);
	if (filtered.length === 0) {
		return null;
	}

	return <div className={className}>{filtered}</div>;
}

Slot.propTypes = {
	name: PropTypes.string.isRequired,
	props: PropTypes.object.isRequired,
	className: PropTypes.string,
};
Slot.contextTypes = {
	slots: PropTypes.object.isRequired,
};
