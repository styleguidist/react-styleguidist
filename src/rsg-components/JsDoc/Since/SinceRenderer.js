import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';

export const styles = () => ({
	sinceBlock: {
		marginBottom: 6,
		fontSize: 'inherit',
	},
});

export function SinceRenderer({ classes, tags }) {
	if (!tags || !tags.since) {
		return null;
	}

	return (
		<div className={classes.sinceBlock}>
			<Markdown text={`Since: ${tags.since[0].description}`} inline />
		</div>
	);
}
SinceRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	tags: PropTypes.shape({
		since: PropTypes.array,
	}).isRequired,
};
export default Styled(styles)(SinceRenderer);
