import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Link from 'rsg-components/Link';
import Styled from 'rsg-components/Styled';

const styles = ({ base, font, small, spacing, fonts }) => ({
	list: {
		margin: 0,
		paddingLeft: spacing.space16,
	},
	item: {
		color: base,
		display: 'block',
		margin: [[spacing.space8, 0, spacing.space8, 0]],
		fontFamily: font,
		fontSize: fonts.size14,
		listStyle: 'none',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	isChild: {
		[small]: {
			display: 'inline-block',
			margin: [[0, spacing.space8, 0, 0]],
		},
	},
	heading: {
		color: base,
		marginTop: spacing.space8,
		fontFamily: font,
		fontWeight: 'bold',
	},
});

export function ComponentsListRenderer({ classes, items }) {
	items = items.filter(item => item.name);

	if (!items.length) {
		return null;
	}

	return (
		<ul className={classes.list}>
			{items.map(({ heading, name, slug, content }) => (
				<li className={cx(classes.item, (!content || !content.props.items.length) && classes.isChild)} key={name}>
					<Link className={cx(heading && classes.heading)} href={`#${slug}`}>{name}</Link>
					{content}
				</li>
			))}
		</ul>
	);
}

ComponentsListRenderer.propTypes = {
	items: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
};

export default Styled(styles)(ComponentsListRenderer);
