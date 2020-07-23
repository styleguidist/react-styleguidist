import React from 'react';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import { MdInfoOutline } from 'react-icons/md';
import Text from 'rsg-components/Text';
import Tooltip from 'rsg-components/Tooltip';
import * as Rsg from '../../../typings';

export const styles = ({ space }: Rsg.Theme) => ({
	complexType: {
		alignItems: 'center',
		cursor: 'pointer',
		display: 'inline-flex',
		'& span': {
			marginRight: space[0],
			cursor: 'pointer',
		},
	},
});

export interface ComplexTypeProps extends JssInjectedProps {
	name: string;
	raw: string;
}

function ComplexTypeRenderer({ classes, name, raw }: ComplexTypeProps) {
	return (
		<Tooltip placement="right" content={raw}>
			<span className={classes.complexType}>
				<Text>{name}</Text>
				<MdInfoOutline />
			</span>
		</Tooltip>
	);
}

export default Styled<ComplexTypeProps>(styles)(ComplexTypeRenderer);
