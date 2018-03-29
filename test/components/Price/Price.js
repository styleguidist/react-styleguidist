import React from 'react';
import PropTypes from 'prop-types';

const unitSymbols = {
	USD: '$',
	EUR: '€',
};

/**
 * Price component that renders a price and a unit.
 */
export default function Price(props) {
	let Host = 'span';
	if (props.emphasize) {
		Host = 'em';
	}
	return (
		<Host>
			{props.value}
			{!props.symbol ? props.unit : unitSymbols[props.unit]}
		</Host>
	);
}

Price.propTypes = {
	/** Price value. */
	value: PropTypes.number.isRequired,
	/** Price unit */
	unit: PropTypes.oneOf(['EUR', 'USD']),
	/** Flag that determines if the price should be emphasized or not. */
	emphasize: PropTypes.bool,
	/** Defines if the unit should be shown as a symbol or not. */
	symbol: PropTypes.bool.isRequired,
};
