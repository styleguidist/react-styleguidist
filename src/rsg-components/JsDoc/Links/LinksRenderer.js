import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';

export const styles = ({ font }) => ({
	linksBlock: {
		marginTop: 6,
		fontSize: 'inherit',
	},
	linksHeader: {
		fontSize: 'inherit',
		fontFamily: font,
	},
	linksList: {
		fontSize: 'inherit',
		marginTop: 0,
		marginBottom: 0,
		marginLeft: 20,
	},
});

export function LinksRenderer({ classes, tags }) {
	if (!tags || (!tags.link && !tags.see)) {
		return null;
	}

	function renderLinks(links) {
		return links.map((link, index) => {
			return (
				<li key={`link-${index}`}><Markdown text={link.description} inline /></li>
			);
		});
	}

	return (
		<div className={classes.linksBlock}>
			<div className={classes.linksHeader}>More information</div>
			<ul className={classes.linksList}>
				{ tags.see && renderLinks(tags.see) }
				{ tags.link && renderLinks(tags.link) }
			</ul>
		</div>

	);
}
LinksRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	tags: PropTypes.shape({
		see: PropTypes.array,
		link: PropTypes.array,
	}).isRequired,
};
export default Styled(styles)(LinksRenderer);
