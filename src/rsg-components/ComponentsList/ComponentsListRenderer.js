import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Link from 'rsg-components/Link';
import Styled from 'rsg-components/Styled';

const styles = ({ font, small }) => ({
	list: {
		margin: 0,
		paddingLeft: 15,
	},
	item: {
		display: 'block',
		margin: [[7, 0, 7, 0]],
		fontFamily: font,
		fontSize: 15,
		listStyle: 'none',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	isChild: {
		[small]: {
			display: 'inline-block',
			margin: [[0, 7, 0, 0]],
		},
	},
	heading: {
		marginTop: 7,
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
