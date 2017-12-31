import React, { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Styled from 'rsg-components/Styled';
import { styles as paraStyles } from 'rsg-components/Para';

const styles = ({ space, color, fontFamily }) => ({
	list: {
		...paraStyles({ space, color, fontFamily }).para,
		paddingLeft: space[3],
	},
	ordered: {
		listStyleType: 'decimal',
	},
	li: {
		color: color.base,
		fontFamily: fontFamily.base,
		fontSize: 'inherit',
		listStyleType: 'inherit',
	},
});

export function ListRenderer({ classes, ordered, children }) {
	const Tag = ordered ? 'ol' : 'ul';

	const classNames = cx(classes.list, ordered && classes.ordered);

	return (
		<Tag className={classNames}>
			{Children.map(children, li => cloneElement(li, { className: classes.li }))}
		</Tag>
	);
}
ListRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	ordered: PropTypes.bool,
	children: PropTypes.node.isRequired,
};
ListRenderer.defaultProps = {
	ordered: false,
};

export default Styled(styles)(ListRenderer);
