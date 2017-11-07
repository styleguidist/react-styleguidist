import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';

const styles = ({ space, color, borderRadius }) => ({
	rootHasEditor: {
		padding: space[2],
		border: [[1, color.border, 'solid']],
		borderRadius,
	},
	rootHasError: {
		padding: 0,
	},
});

export function PreviewRenderer({
	name,
	className,
	classes,
	hasEditor,
	hasError,
	children,
	...props
}) {
	const classNames = cx(
		{
			[classes.rootHasEditor]: hasEditor,
			[classes.rootHasError]: hasError,
		},
		className
	);

	return (
		<div {...props} className={classNames} data-preview={name}>
			{children}
		</div>
	);
}

PreviewRenderer.propTypes = {
	name: PropTypes.string.isRequired,
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
	hasEditor: PropTypes.bool,
	hasError: PropTypes.bool,
	children: PropTypes.node,
};

PreviewRenderer.defaultProps = {
	hasEditor: true,
	hasError: false,
};

export default Styled(styles)(PreviewRenderer);
