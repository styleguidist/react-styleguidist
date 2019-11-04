import React, { ReactNode } from 'react'
import styled from 'styled-components';
import { themeGet } from 'styled-system';

interface ButtonProps {
	/** Button label */
	children: ReactNode,
	/** Button variation */
	variant: 'primary' | 'secondary',
	fullWidth: Boolean,
}

const getColor = (variant: string) => ({ primary: 'bg', secondary: 'primary' }[variant]);
const getBgColor = (variant: string) => ({ primary: 'primary' }[variant]);

/**
 * A button.
 */
const Button = styled.button<ButtonProps>`
	display: ${props => props.fullWidth && 'block'};
	width: ${props => props.fullWidth && '100%'};
	height: 2.5rem;
	padding: ${themeGet('space.3')} ${themeGet('space.4')};
	text-align: center;
	border: 1px solid ${themeGet('colors.primary')};
	border-radius: ${themeGet('radii.base')};
	font-family: ${themeGet('fonts.base')};
	font-size: ${themeGet('fontSizes.base')};
	color: ${props => props.theme.colors[getColor(props.variant)]};
	background-color: ${props =>
		props.theme.colors[getBgColor(props.variant)] || 'transparent'};
	text-decoration: none;
	user-select: none;
	box-sizing: border-box;
	/* We can't use :enabled here because it doesn't work with <a> */
	&:hover:not(:disabled),
	&:active:not(:disabled) {
		border-color: ${themeGet('colors.hover')};
		background-color: ${themeGet('colors.hover')};
		cursor: pointer;
	}
	&:focus {
		outline: 0;
		box-shadow: 0 0 0 2px ${themeGet('colors.focus')};
	}
	&:disabled {
		opacity: 0.6;
		filter: saturate(60%);
	}
	&::-moz-focus-inner {
		border: 0;
	}
`;

/** @component */
export default Button;
