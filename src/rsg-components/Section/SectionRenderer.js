import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import Heading from 'rsg-components/Heading';
import Link from 'rsg-components/Link';

const styles = ({ space, fontFamily, fontSize }) => ({
	root: {
		marginBottom: space[4],
		'&:hover $isolatedLink': {
			isolate: false,
			opacity: 1,
		},
	},
	heading: {
		margin: [[0, 0, space[2]]],
		fontFamily: fontFamily.base,
		fontSize: fontSize.h1,
	},
	isolatedLink: {
		position: 'absolute',
		top: 0,
		right: 0,
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		opacity: 0,
		transition: 'opacity ease-in-out .15s .2s',
	},
	titleWrapper: {
		position: 'relative',
	},
});

export function SectionRenderer({
	classes,
	name,
	slug,
	content,
	components,
	sections,
	isolatedSection,
}) {
	return (
		<section className={classes.root}>
			<div className={classes.titleWrapper}>
				{name && <Heading level={1} slug={slug} className={classes.heading}>{name}</Heading>}
				<div className={classes.isolatedLink}>
					{name &&
						(isolatedSection
							? <Link href="">⇽ Back</Link>
							: <Link href={'#!/' + name}>Open isolated ⇢</Link>)}
				</div>
			</div>
			{content}
			{components}
			{sections}
		</section>
	);
}

SectionRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	name: PropTypes.string,
	slug: PropTypes.string,
	content: PropTypes.node,
	components: PropTypes.node,
	sections: PropTypes.node,
	isolatedSection: PropTypes.bool,
};

export default Styled(styles)(SectionRenderer);
