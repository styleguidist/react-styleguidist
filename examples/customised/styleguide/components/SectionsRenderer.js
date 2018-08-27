import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Heading from 'rsg-components/Heading';
// Import default implementation from react-styleguidist using the full path
import DefaultSectionsRenderer from 'react-styleguidist/lib/rsg-components/Sections/SectionsRenderer';

const styles = ({ fontFamily, color, space }) => ({
	headingSpacer: {
		marginBottom: space[2],
	},
	descriptionText: {
		marginTop: space[0],
		fontFamily: fontFamily.base,
	},
});

export function SectionsRenderer({ classes, children }) {
	return (
		<div>
			{!!children.length &&
				<div className={classes.headingSpacer}>
					<Heading level={1}>Example Components</Heading>
					<p className={classes.descriptionText}>These are the greatest components</p>
				</div>}
			<DefaultSectionsRenderer>{children}</DefaultSectionsRenderer>
		</div>
	);
}

SectionsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
};

export default Styled(styles)(SectionsRenderer);
