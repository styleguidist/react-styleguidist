import React from 'react';
import PropTypes from 'prop-types';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';

const styles = ({ fontSize }: Rsg.Theme) => ({
	article: {
		fontSize: fontSize.text,
	},
});

interface ExamplesRendererProps extends JssInjectedProps {
	children?: React.ReactNode;
	name?: string;
}

export const ExamplesRenderer: React.FunctionComponent<ExamplesRendererProps> = ({
	classes,
	name,
	children,
}) => {
	return (
		<article className={classes.article} data-testid={`${name}-examples`}>
			{children}
		</article>
	);
};

ExamplesRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	name: PropTypes.string.isRequired,
	children: PropTypes.node,
};

export default Styled<ExamplesRendererProps>(styles)(ExamplesRenderer);
