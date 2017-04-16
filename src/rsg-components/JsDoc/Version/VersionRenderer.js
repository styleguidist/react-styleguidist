import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';

export const styles = () => ({
	versionBlock: {
		marginBottom: 6,
		fontSize: 'inherit',
	},
});

export function VersionRenderer({ classes, tags }) {
	if (!tags || !tags.version) {
		return null;
	}

	return (
		<div className={classes.versionBlock}>
			<Markdown text={`Version: ${tags.version[0].description}`} inline />
		</div>
	);
}
VersionRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	tags: PropTypes.shape({
		version: PropTypes.array,
	}).isRequired,
};
export default Styled(styles)(VersionRenderer);
