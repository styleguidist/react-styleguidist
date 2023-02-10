import React from 'react';
import PropTypes from 'prop-types';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import Heading from 'rsg-components/Heading';
import * as Rsg from '../../../../typings';

const styles = ({ space }: Rsg.Theme) => ({
	spacing: {
		marginBottom: space[2],
	},
});

interface MarkdownHeadingProps extends JssInjectedProps {
	children: React.ReactNode;
	level: number;
	id?: string;
}

const MarkdownHeadingRenderer: React.FunctionComponent<MarkdownHeadingProps> = ({
	classes,
	level,
	children,
	id,
}) => {
	return (
		<div className={classes.spacing}>
			<Heading level={level} id={id}>
				{children}
			</Heading>
		</div>
	);
};

MarkdownHeadingRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
	children: PropTypes.any,
	id: PropTypes.string,
};

export default Styled<MarkdownHeadingProps>(styles)(MarkdownHeadingRenderer);
