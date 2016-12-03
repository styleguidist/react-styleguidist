import React, { PropTypes } from 'react';
import Styled from 'rsg-components/Styled';

const styles = ({ font, base, border, link, baseBackground }) => ({
	root: {
		fontFamily: font,
	},
	input: {
		display: 'block',
		boxSizing: 'border-box',
		width: 170,
		margin: [[15, 0, 0, 15]],
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
	items,
	searchTerm,
	onSearchTermChange,
}) {
	return (
		<div>
			<div className={classes.root}>
				<input
					value={searchTerm}
					className={classes.input}
					placeholder="Filter by name"
					onChange={event => onSearchTermChange(event.target.value)}
				/>
				{items}
			</div>
		</div>
	);
}

TableOfContentsRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	items: PropTypes.node.isRequired,
	searchTerm: PropTypes.string.isRequired,
	onSearchTermChange: PropTypes.func.isRequired,
};

export default Styled(styles)(TableOfContentsRenderer);
