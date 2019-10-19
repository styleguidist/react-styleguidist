import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Link from 'rsg-components/Link';
import Styled from 'rsg-components/Styled';
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
		position: 'relative',
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
	isNew: {
		backgroundColor: color.isNew,
	},
	isDeprecated: {
		backgroundColor: color.isDeprecated,
	},
	isExperimental: {
		backgroundColor: color.isExperimental,
	},
	badge: {
		position: 'absolute',
		right: '5px',
		top: '4px',
		borderRadius: '5px',
		width: '10px',
		height: '10px',
	},
});

export function ComponentsListRenderer({ classes, items }, { config }) {
	const { pagePerSection } = config;
	items = items.filter(item => item.visibleName);

	// items should provide info about isNew, isDeprecated, isExperimental

	if (!items.length) {
		return null;
	}

	// Match selected component in both basic routing and pagePerSection routing.
	const { hash, pathname } = window.location;
	const windowHash = pathname + (pagePerSection ? hash : getHash(hash));
	return (
		<ul className={classes.list}>
			{items.map(
				({
					heading,
					visibleName,
					isNew = true,
					isDeprecated = false,
					isExperimental = false,
					href,
					content,
					shouldOpenInNewTab,
				}) => {
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
							<span
								className={cx(classes.badge, {
									[classes.isNew]: isNew,
									[classes.isDeprecated]: isDeprecated,
									[classes.isExperimental]: isExperimental,
								})}
							/>
						</li>
					);
				}
			)}
		</ul>
	);
}

ComponentsListRenderer.propTypes = {
	items: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
};

ComponentsListRenderer.contextTypes = {
	config: PropTypes.object.isRequired,
};

export default Styled(styles)(ComponentsListRenderer);
