import React from 'react';
import PropTypes from 'prop-types';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';

const styles = () => ({
	// Just default jss-isolate rules
	root: {},
});

interface SectionsRendererProps extends JssInjectedProps {
	children: React.ReactNode;
}

export const SectionsRenderer: React.FunctionComponent<SectionsRendererProps> = ({
	classes,
	children,
}) => {
	return <section className={classes.root}>{children}</section>;
};

SectionsRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	children: PropTypes.any,
};

export default Styled<SectionsRendererProps>(styles)(SectionsRenderer);
