import React from 'react';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../../typings';

const styles = ({ space, color, fontSize, fontFamily }: Rsg.Theme) => ({
	td: {
		padding: [[space[0], space[2], space[0], 0]],
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		color: color.base,
		lineHeight: 1.5,
	},
	th: {
		composes: '$td',
		fontWeight: 'bold',
	},
});

interface TableCellProps extends JssInjectedProps {
	children: React.ReactNode;
	header?: boolean;
}

export const TableCellRenderer: React.FunctionComponent<TableCellProps> = ({
	classes,
	header = false,
	children,
}) => {
	if (header) {
		return <th className={classes.th}>{children}</th>;
	}
	return <td className={classes.td}>{children}</td>;
};

export default Styled<TableCellProps>(styles)(TableCellRenderer);
