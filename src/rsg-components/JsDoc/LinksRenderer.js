import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';

const styles = ({ font }) => ({
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

export function JsDocLinks({ classes, tags }) {
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
JsDocLinks.propTypes = {
	classes: PropTypes.object.isRequired,
	tags: PropTypes.object.isRequired,
};
export default Styled(styles)(JsDocLinks);
