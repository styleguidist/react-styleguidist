import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Styled, { Theme, JssInjectedProps } from 'rsg-components/Styled';

const styles = ({ color, fontFamily, fontSize }: Theme) => ({
	heading: {
		margin: 0,
		color: color.base,
		fontFamily: fontFamily.base,
		fontWeight: 'normal',
	},
	heading1: {
		fontSize: fontSize.h1,
	},
	heading2: {
		fontSize: fontSize.h2,
	},
	heading3: {
		fontSize: fontSize.h3,
	},
	heading4: {
		fontSize: fontSize.h4,
	},
	heading5: {
		fontSize: fontSize.h5,
		fontWeight: 'bold',
	},
	heading6: {
		fontSize: fontSize.h6,
		fontStyle: 'italic',
	},
});

interface HeadingProps extends JssInjectedProps {
	children?: React.ReactNode;
	level: number;
}

const HeadingRenderer: React.FunctionComponent<HeadingProps> = ({
	classes,
	level,
	children,
	...props
}) => {
	const Tag = `h${level}` as ('h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6');
	const headingClasses = cx(classes.heading, classes[`heading${level}`]);

	return (
		<Tag {...props} className={headingClasses}>
			{children}
		</Tag>
	);
};

HeadingRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
	children: PropTypes.node,
};

export default Styled<HeadingProps>(styles)(HeadingRenderer);
