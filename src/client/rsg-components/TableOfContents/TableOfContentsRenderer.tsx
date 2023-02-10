import React from 'react';
import PropTypes from 'prop-types';
import { Styles } from 'jss';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';

const styles = ({ space, color, fontFamily, fontSize, borderRadius }: Rsg.Theme): Styles => ({
	root: {
		fontFamily: fontFamily.base,
	},
	search: {
		padding: space[2],
	},
	input: {
		display: 'block',
		width: '100%',
		padding: space[1],
		color: color.base,
		backgroundColor: color.baseBackground,
		fontFamily: fontFamily.base,
		fontSize: fontSize.base,
		border: [[1, color.border, 'solid']],
		borderRadius,
		transition: 'all ease-in-out .1s',
		'&:focus': {
			isolate: false,
			borderColor: color.link,
			boxShadow: [[0, 0, 0, 2, color.focus]],
			outline: 0,
		},
		'&::placeholder': {
			isolate: false,
			fontFamily: fontFamily.base,
			fontSize: fontSize.base,
			color: color.light,
		},
	},
});

interface TableOfContentsRendererProps extends JssInjectedProps {
	children?: React.ReactNode;
	searchTerm: string;
	onSearchTermChange(term: string): void;
}

export const TableOfContentsRenderer: React.FunctionComponent<TableOfContentsRendererProps> = ({
	classes,
	children,
	searchTerm,
	onSearchTermChange,
}) => {
	return (
		<div>
			<div className={classes.root}>
				<nav>
					<div className={classes.search}>
						<input
							value={searchTerm}
							className={classes.input}
							placeholder="Filter by name"
							aria-label="Filter by name"
							onChange={(event) => onSearchTermChange(event.target.value)}
						/>
					</div>
					{children}
				</nav>
			</div>
		</div>
	);
};

TableOfContentsRenderer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
	children: PropTypes.any,
	searchTerm: PropTypes.string.isRequired,
	onSearchTermChange: PropTypes.func.isRequired,
};

export default Styled<TableOfContentsRendererProps>(styles)(TableOfContentsRenderer);
