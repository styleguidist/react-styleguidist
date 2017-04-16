import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';

export const styles = ({ light, font }) => ({
	deprecatedBlock: {
		fontFamily: font,
		marginBottom: 6,
		fontSize: 'inherit',
		color: light,
	},
	deprecatedHeader: {
		fontStyle: 'italic',
	},
});

export function DeprecatedRenderer({ classes, tags }) {
	return (
		<div className={classes.deprecatedBlock}>
			<span className={classes.deprecated}>Deprecated:</span>
			{' '}
			<Markdown text={tags.deprecated[0].description} inline />
		</div>
	);
}

DeprecatedRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	tags: PropTypes.shape({
		deprecated: PropTypes.array,
	}).isRequired,
};

export default Styled(styles)(DeprecatedRenderer);
