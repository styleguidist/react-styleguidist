import React from 'react';
import PropTypes from 'prop-types';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../../typings';

const styles = ({ color }: Rsg.Theme) => ({
	thead: {
		borderBottom: [[1, color.border, 'solid']],
	},
});

interface TableHeadProps extends JssInjectedProps {
	children: React.ReactNode;
}

export const TableHeadRenderer: React.FunctionComponent<TableHeadProps> = ({
	classes,
	children,
}) => {
	return <thead className={classes.thead}>{children}</thead>;
};

TableHeadRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	children: PropTypes.any.isRequired,
};

export default Styled<TableHeadProps>(styles)(TableHeadRenderer);
