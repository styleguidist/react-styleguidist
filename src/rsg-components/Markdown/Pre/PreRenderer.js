import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import prismTheme from '../../../styles/prismTheme';

const styles = ({ space, color, fontSize, fontFamily, borderRadius }) => ({
	pre: {
		fontFamily: fontFamily.base,
		fontSize: fontSize.small,
		lineHeight: 1.5,
		color: color.base,
		whiteSpace: 'pre',
		wordWrap: 'normal',
		tabSize: 2,
		hyphens: 'none',
		backgroundColor: color.codeBackground,
		padding: [[space[1], space[2]]],
		border: [[1, color.codeBackground, 'solid']],
		borderRadius,
		marginTop: 0,
		marginBottom: space[2],
		...prismTheme({ color }),
	},
});

export function PreRenderer({ classes, children }) {
	return <pre className={classes.pre}>{children}</pre>;
}
PreRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(PreRenderer);
