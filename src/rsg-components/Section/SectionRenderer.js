import React, { PropTypes } from 'react';
import Styled from 'rsg-components/Styled';
import Heading from 'rsg-components/Heading';
import Link from 'rsg-components/Link';

const styles = ({ font }) => ({
	root: {
		marginBottom: 50,
		'&:hover $isolatedLink': {
			isolate: false,
			opacity: 1,
		},
	},
	heading: {
		margin: [[0, 0, 20]],
		fontFamily: font,
		fontSize: 38,
		fontWeight: 'bold',
	},
	isolatedLink: {
		position: 'absolute',
		top: 0,
		right: 0,
		fontFamily: font,
		fontSize: 14,
		opacity: 0,
		transition: 'opacity ease-in-out .15s .2s',
	},
	titleWrapper: {
		position: 'relative',
	},
});

export function SectionRenderer({ classes, name, slug, content, components, sections, isolatedSection }) {
	return (
		<section className={classes.root}>
			<div className={classes.titleWrapper}>
				{name && (
					<Heading level={1} slug={slug} className={classes.heading}>{name}</Heading>
				)}
				<div className={classes.isolatedLink}>
					{name && (
						isolatedSection ? (
							<Link href="/">⇽ Back</Link>
						) : (
							<Link href={'#!/' + name}>Open isolated ⇢</Link>
						)
					)}
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
