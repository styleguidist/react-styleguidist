import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Link from 'rsg-components/Link';
import Styled from 'rsg-components/Styled';
import { useStyleGuideContext } from 'rsg-components/Context';
import { getHash } from '../../utils/handleHash';

const styles = ({ color, fontFamily, fontSize, space, mq }) => ({
	list: {
		margin: 0,
		paddingLeft: space[2],
	},
	item: {
		color: color.base,
		display: 'block',
		margin: [[space[1], 0, space[1], 0]],
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		listStyle: 'none',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	isChild: {
		[mq.small]: {
			display: 'inline-block',
			margin: [[0, space[1], 0, 0]],
		},
	},
	heading: {
		color: color.base,
		marginTop: space[1],
		fontFamily: fontFamily.base,
		fontWeight: 'bold',
	},
	isSelected: {
		fontWeight: 'bold',
	},
});

export function ComponentsListRenderer({ classes, items }) {
	const {
		config: { pagePerSection },
	} = useStyleGuideContext();

	const visibleItems = items.filter(item => item.visibleName);

	if (!visibleItems.length) {
		return null;
	}

	// Match selected component in both basic routing and pagePerSection routing.
	const { hash, pathname } = window.location;
	const windowHash = pathname + (pagePerSection ? hash : getHash(hash));
	return (
		<ul className={classes.list}>
			{visibleItems.map(({ heading, visibleName, href, content, shouldOpenInNewTab }) => {
				const isItemSelected = windowHash === href;
				return (
					<li
						className={cx(classes.item, {
							[classes.isChild]: (!content || !content.props.items.length) && !shouldOpenInNewTab,
							[classes.isSelected]: isItemSelected,
						})}
						key={href}
					>
						<Link
							className={cx(heading && classes.heading)}
							href={href}
							target={shouldOpenInNewTab ? '_blank' : undefined}
						>
							{visibleName}
						</Link>
						{content}
					</li>
				);
			})}
		</ul>
	);
}

ComponentsListRenderer.propTypes = {
	items: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
};

export default Styled(styles)(ComponentsListRenderer);
