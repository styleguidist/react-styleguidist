/* global SyntheticEvent */
import * as React from 'react';

import './FlowButton.css';

type Props = {
	/** Button label */
	children: React.ReactNode,
	/** The color for the button */
	color: string,
	/** The size of the button */
	size: 'small' | 'normal' | 'large',
	/** Disable button */
	disabled?: boolean,
	/** Gets called when the user clicks on the button */
	onClick: (event: SyntheticEvent<HTMLButtonElement>) => void,
	/** Width and padding for the button */
	styles?: {
		width?: number,
		padding?: string | number,
	},
};

/**
 * Flow typed button.
 */
export default function FlowButton({
	color,
	size,
	onClick,
	disabled,
	children,
	styles: extendedStyles = {},
}: Props) {
	const styles = Object.assign(
		{
			color,
			fontSize: FlowButton.sizes[size],
		},
		extendedStyles
	);

	return (
		<button className="button" style={styles} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
}

/* eslint-disable react/default-props-match-prop-types */
FlowButton.defaultProps = {
	color: '#333',
	size: 'normal',
	onClick: event => {
		// eslint-disable-next-line no-console
		console.log('You have clicked me!', event.target);
	},
};
/* eslint-enable react/default-props-match-prop-types */
FlowButton.sizes = {
	small: '10px',
	normal: '14px',
	large: '18px',
};
