import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Link from 'rsg-components/Link';
import Styled from 'rsg-components/Styled';

const styles = ({ font, small }) => ({
	list: {
		margin: 15,
	},
	item: {
		fontFamily: font,
		marginBottom: 7,
		fontSize: 15,
	},
	isChild: {
		[small]: {
			display: 'inline-block',
			margin: [[0, 7, 0, 0]],
		},
	},
	heading: {
		fontFamily: font,
		fontWeight: 'bold',
	},
});

export function ComponentsListRenderer({ classes, items }) {
	if (!items.length) {
		return null;
	}

	return (
		<div className={classes.list}>
			{items.map(({ heading, name, content }) => (
				<div className={cx(classes.item, (!content || !content.props.items.length) && classes.isChild)} key={name}>
					<span className={heading && classes.heading}>
						<Link href={'#' + name}>{name}</Link>
					</span>
					{content}
				</div>
			))}
		</div>
	);
}

ComponentsListRenderer.propTypes = {
	items: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
};

export default Styled(styles)(ComponentsListRenderer);
