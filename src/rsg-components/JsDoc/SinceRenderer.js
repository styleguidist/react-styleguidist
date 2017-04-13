import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';

const styles = ({ font }) => ({
	sinceBlock: {
		marginBottom: 6,
		fontSize: 'inherit',
	},
	sinceHeader: {
		fontSize: 'inherit',
		fontFamily: font,
	},
});

export function JsDocSince({ classes, tags }) {
	return (
		<div className={classes.sinceBlock}>
			<span className={classes.sinceHeader}>Since:</span>
			{' '}
			<Markdown text={tags.since[0].description} inline />
		</div>
	);
}
JsDocSince.propTypes = {
	classes: PropTypes.object.isRequired,
	tags: PropTypes.object.isRequired,
};
export default Styled(styles)(JsDocSince);
