import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Styled from 'rsg-components/Styled';
import Para from 'rsg-components/Para';

const styles = ({ space }) => ({
	list: {
		paddingLeft: space[3],
	},
	ordered: {
		listStyleType: 'decimal',
	},
});

export function ListRenderer({ classes, ordered, children }) {
	const Tag = ordered ? 'ol' : 'ul';

	const classNames = cx(classes.list, ordered && classes.ordered);

	return (
		<Para>
			<Tag className={classNames}>{children}</Tag>
		</Para>
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
