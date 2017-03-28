import React, { PropTypes } from 'react';
import Styled from 'rsg-components/Styled';

const styles = ({ font, base, border, link, baseBackground }) => ({
	root: {
		fontFamily: font,
	},
	search: {
		padding: 15,
	},
	input: {
		display: 'block',
		width: '100%',
		padding: [[6, 12]],
		color: base,
		backgroundColor: baseBackground,
		fontFamily: font,
		fontSize: 15,
		border: [[1, border, 'solid']],
		borderRadius: 2,
		transition: 'border-color ease-in-out .15s',
		'&:focus': {
			isolate: false,
			borderColor: link,
			outline: 0,
		},
	},
});

export function TableOfContentsRenderer({
	classes,
	children,
	searchTerm,
	onSearchTermChange,
}) {
	return (
		<div>
			<div className={classes.root}>
				<div className={classes.search}>
					<input
						value={searchTerm}
						className={classes.input}
						placeholder="Filter by name"
						onChange={event => onSearchTermChange(event.target.value)}
					/>
				</div>
				{children}
			</div>
		</div>
	);
}

TableOfContentsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node,
	searchTerm: PropTypes.string.isRequired,
	onSearchTermChange: PropTypes.func.isRequired,
};

export default Styled(styles)(TableOfContentsRenderer);
