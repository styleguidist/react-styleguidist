import React, { PropTypes } from 'react';
import Link from 'rsg-components/Link';
import Styled from 'rsg-components/Styled';

const styles = ({ font }) => ({
	list: {
		padding: 15,
	},
	item: {
		fontFamily: font,
		marginBottom: 7,
		fontSize: 15,
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
				<div className={classes.item} key={name}>
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
