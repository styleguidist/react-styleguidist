import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';

const styles = ({ font }) => ({
	versionBlock: {
		marginBottom: 6,
		fontSize: 'inherit',
	},
	versionHeader: {
		fontSize: 'inherit',
		fontFamily: font,
	},
});

export function JsDocVersion({ classes, tags }) {
	return (
		<div className={classes.versionBlock}>
			<span className={classes.versionHeader}>Version:</span>
			{' '}
			<Markdown text={tags.version[0].description} inline />
		</div>
	);
}
JsDocVersion.propTypes = {
	classes: PropTypes.object.isRequired,
	tags: PropTypes.object.isRequired,
};
export default Styled(styles)(JsDocVersion);
