import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import MdContentCopy from 'react-icons/lib/md/content-copy';
import ToolbarButton from 'rsg-components/ToolbarButton';
import Styled from 'rsg-components/Styled';

export const styles = ({ space, fontFamily, fontSize, color }) => ({
	pathline: {
		fontFamily: fontFamily.monospace,
		fontSize: fontSize.small,
		color: color.light,
	},
	copyButton: {
		marginLeft: space[0],
	},
});

export function PathlineRenderer({ classes, children }) {
	return (
		<div className={classes.pathline}>
			{children}
			<ToolbarButton
				small
				className={classes.copyButton}
				onClick={() => copy(children)}
				title="Copy to clipboard"
			>
				<MdContentCopy />
			</ToolbarButton>
		</div>
	);
}

PathlineRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.string,
};

export default Styled(styles)(PathlineRenderer);
