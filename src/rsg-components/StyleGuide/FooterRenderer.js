import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';

const styles = ({ color, fontFamily, fontSize }) => ({
	footer: {
		display: 'block',
		color: color.light,
		fontFamily: fontFamily.base,
		fontSize: fontSize.small,
	},
});

const Footer = ({ classes, homepageUrl }) => (
	<footer className={classes.footer}>
		<Markdown text={`Generated with [React Styleguidist](${homepageUrl})`} />
	</footer>
);

Footer.propTypes = {
	classes: PropTypes.object.isRequired,
	homepageUrl: PropTypes.string.isRequired,
};

export default Styled(styles)(Footer);
