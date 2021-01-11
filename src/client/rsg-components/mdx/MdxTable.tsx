import React, { ComponentProps } from 'react';
import PropTypes from 'prop-types';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';

const styles = ({ space }: Rsg.Theme) => ({
	table: {
		marginTop: 0,
		marginBottom: space[2],
		borderCollapse: 'collapse',
	},
});

export const MdxTable: React.FunctionComponent<JssInjectedProps> = ({ classes, children }) => {
	return <table className={classes.table}>{children}</table>;
};

MdxTable.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};

export default Styled<ComponentProps<typeof MdxTable>>(styles)(MdxTable);
