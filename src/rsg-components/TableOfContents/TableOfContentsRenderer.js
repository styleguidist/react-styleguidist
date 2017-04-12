import React from 'react';
import PropTypes from 'prop-types';

import s from './TableOfContents.css';

const TableOfContentsRenderer = ({ items, searchTerm, onSearchTermChange }) => {
	return (
		<div>
			<div className={s.root}>
				<input
					value={searchTerm}
					className={s.search}
					placeholder="Filter by name"
					onChange={event => onSearchTermChange(event.target.value)}
				/>
				{items}
			</div>
		</div>
	);
};

TableOfContentsRenderer.propTypes = {
	items: PropTypes.node.isRequired,
	searchTerm: PropTypes.string.isRequired,
	onSearchTermChange: PropTypes.func.isRequired,
};

export default TableOfContentsRenderer;
