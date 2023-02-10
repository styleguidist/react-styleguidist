import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Heading from 'rsg-components/Heading';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';

const styles = ({ color, space }: Rsg.Theme) => ({
	wrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: space[1],
	},
	toolbar: {
		marginLeft: 'auto',
	},
	sectionName: {
		'&:hover, &:active': {
			isolate: false,
			textDecoration: 'underline',
			cursor: 'pointer',
		},
	},
	isDeprecated: {
		color: color.light,
		'&, &:hover': {
			textDecoration: 'line-through',
		},
	},
});

interface SectionHeadingRendererProps extends JssInjectedProps {
	children?: React.ReactNode;
	toolbar?: React.ReactNode;
	id: string;
	href?: string;
	depth: number;
	deprecated?: boolean;
}

const SectionHeadingRenderer: React.FunctionComponent<SectionHeadingRendererProps> = ({
	classes,
	children,
	toolbar,
	id,
	href,
	depth,
	deprecated,
}) => {
	const headingLevel = Math.min(6, depth);
	const sectionNameClasses = cx(classes.sectionName, {
		[classes.isDeprecated]: deprecated,
	});

	return (
		<div className={classes.wrapper}>
			<Heading level={headingLevel} id={id}>
				<a href={href} className={sectionNameClasses}>
					{children}
				</a>
			</Heading>
			<div className={classes.toolbar}>{toolbar}</div>
		</div>
	);
};

SectionHeadingRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	children: PropTypes.any,
	toolbar: PropTypes.any,
	id: PropTypes.string.isRequired,
	href: PropTypes.string,
	depth: PropTypes.number.isRequired,
	deprecated: PropTypes.bool,
};

export default Styled<SectionHeadingRendererProps>(styles)(SectionHeadingRenderer);
