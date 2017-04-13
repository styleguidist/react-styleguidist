import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Markdown from 'rsg-components/Markdown';

const styles = ({ light, font }) => ({
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

export function JsDocDeprecated({ classes, tags }) {
	return (
		<div className={classes.deprecatedBlock}>
			<span className={classes.deprecated}>Deprecated:</span>
			{' '}
			<Markdown text={tags.deprecated[0].description} inline />
		</div>
	);
}

JsDocDeprecated.propTypes = {
	classes: PropTypes.object.isRequired,
	tags: PropTypes.object.isRequired,
};

export default Styled(styles)(JsDocDeprecated);
