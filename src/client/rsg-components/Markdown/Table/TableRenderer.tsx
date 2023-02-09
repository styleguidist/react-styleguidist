import React from 'react';
import PropTypes from 'prop-types';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../../typings';

const styles = ({ space }: Rsg.Theme) => ({
	table: {
		marginTop: 0,
		marginBottom: space[2],
		borderCollapse: 'collapse',
	},
});

interface TableProps extends JssInjectedProps {
	children: React.ReactNode;
}

export const TableRenderer: React.FunctionComponent<TableProps> = ({ classes, children }) => {
	return <table className={classes.table}>{children}</table>;
};

TableRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	children: PropTypes.any.isRequired,
};

export default Styled<TableProps>(styles)(TableRenderer);
