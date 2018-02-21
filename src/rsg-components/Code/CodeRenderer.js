import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Styled from 'rsg-components/Styled';

const styles = ({ fontFamily }) => ({
	code: {
		fontFamily: fontFamily.monospace,
		fontSize: 'inherit',
		color: 'inherit',
		background: 'transparent',
		whiteSpace: 'inherit',
	},
});

export function CodeRenderer({ classes, className, children }) {
	const classNames = cx(className, classes.code);

	const isHighlighted = className && className.indexOf('lang-') !== -1;
	if (isHighlighted) {
		return <code className={classNames} dangerouslySetInnerHTML={{ __html: children }} />;
	}
	return <code className={classNames}>{children}</code>;
}
CodeRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default Styled(styles)(CodeRenderer);
