// Inspired by https://github.com/camwest/react-slot-fill

import React from 'react';
import PropTypes from 'prop-types';

export default function Slot({ name, active, onlyActive, className, props = {} }, { slots }) {
	const fills = slots[name];
	if (!fills) {
		throw new Error(`Slot "${name}" not found, available slots: ${Object.keys(slots).join(', ')}`);
	}

	const rendered = fills.map((Fill, index) => {
		// { id: 'pizza', render: ({ foo }) => <div>{foo}</div> }
		const { id, render } = Fill;
		if (id && render) {
			// Render only specified fill
			if (onlyActive && id !== active) {
				return null;
			}

			const { onClick } = props;
			props = {
				...props,
				name: id,
				// Set active prop to active fill
				active: active && id === active,
				// Pass fill ID to onClick event handler
				// eslint-disable-next-line react/prop-types
				onClick: onClick && ((...attrs) => onClick(id, ...attrs)),
			};

			Fill = render;
		}

		return <Fill key={index} {...props} />;
	});

	const filtered = rendered.filter(Boolean);
	if (filtered.length === 0) {
		return null;
	}

	return <div className={className}>{filtered}</div>;
}

Slot.propTypes = {
	name: PropTypes.string.isRequired,
	active: PropTypes.string,
	onlyActive: PropTypes.bool,
	props: PropTypes.object,
	className: PropTypes.string,
};
Slot.contextTypes = {
	slots: PropTypes.object.isRequired,
};
