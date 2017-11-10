import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
function Render({ wrappers, props, children }) {
	const [wrapper, ...rest] = wrappers;

	if (rest.length > 0) {
		children = <Render wrappers={rest}>{children}</Render>;
	}

	const Wrapper = wrapper.render;
	return <Wrapper {...props}>{children}</Wrapper>;
}

export default function Container({ name, children, props = {} }, { slots }) {
	const fills = slots[name];
	if (!fills) {
		throw new Error(`Slot "${name}" not found, available slots: ${Object.keys(slots).join(', ')}`);
	}

	if (fills.length > 0) {
		return (
			<Render wrappers={fills} props={props}>
				{children}
			</Render>
		);
	}

	return children;
}

Container.propTypes = {
	name: PropTypes.string.isRequired,
	props: PropTypes.object,
	children: PropTypes.node,
};
Container.contextTypes = {
	slots: PropTypes.object.isRequired,
};
