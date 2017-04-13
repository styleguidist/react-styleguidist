import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';

const styles = ({ font }) => ({
	authorsBlock: {
		marginTop: 8,
		fontSize: 'inherit',
	},
	authorsHeader: {
		fontStyle: 'italic',
		fontSize: 'inherit',
		fontFamily: font,
	},
	authorsList: {
		marginTop: 3,
		marginBottom: 3,
		marginLeft: 20,
	},
});

export function JsDocAuthors({ classes, tags }) {
	function renderAuthors(authors) {
		return (
			authors.map((author, index) => {
				return (
					<li key={`author-${index}`}>
						<Markdown text={author.description} inline />
					</li>
				);
			})
		);
	}

	return (
		<div className={classes.authorsBlock}>
			<div className={classes.authorsHeader}>{tags.author.length === 1 ? 'Author' : 'Authors'}</div>
			<ul className={classes.authorsList}>
				{ renderAuthors(tags.author) }
			</ul>
		</div>
	);
}

JsDocAuthors.propTypes = {
	classes: PropTypes.object.isRequired,
	tags: PropTypes.object.isRequired,
};

export default Styled(styles)(JsDocAuthors);
