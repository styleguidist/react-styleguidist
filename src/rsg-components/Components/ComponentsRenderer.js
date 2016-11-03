import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Icon from 'rsg-components/Icon';

const renderSearchHeader = (searchTerm, onSearchTermChange, onSearchBlur) => {
	return (
		<div className="rsg-components__search-header fixed">
			<header className="w-content-ns bg-white flex justify-start items-center h4 bb b--black-20">
				<div className="w-100 mw8 center ph2">
					<h1 className="ma0 f2">Components</h1>
				</div>
			</header>

			<div className="bg-white w-100 pv1 bb b--black-20">
				<div className="mw8 center ph2">
					<input
						ref="search-input"
						className="db w-100 ph1 h2_5 bw1 br1 b--solid b--black-20 lh-input trans-all shadow-hover"
						placeholder="What Are You Looking For?"
						onChange={onSearchTermChange}
						value={searchTerm}
						type="search"
						onBlur={onSearchBlur}
					/>
				</div>
			</div>
		</div>
	);
};

const renderPlainHeader = () => {
	return (
		<div className="rsg-components__plain-header">
			<header className="fixed w-100 bg-white h3 bb b--black-20">
				<div className="w-100 h-100 mw8 flex items-center justify-end center ph3">
					<a href="#" className="db flex items-center justify-center" style={{ height: '44px', width: '44px' }}>
						<Icon glyph="close" />
					</a>
				</div>
			</header>
		</div>
	);
};

const ComponentsRenderer = ({ isListPage, searchTerm, components, sections, onSearchTermChange, onSearchBlur }) => {
	const componentSectionClasses = classNames('rsg-components__component-section w-100 mw8 center ph2', {
		'pt-appbar-searchbar': isListPage,
		'pt-appbar': !isListPage,
	});
	const classes = classNames('rsg-components', {
		'bg-white': !isListPage,
	});

	return (
		<div className={classes}>
			{isListPage ? renderSearchHeader(searchTerm, onSearchTermChange, onSearchBlur) : renderPlainHeader()}
			<div className={componentSectionClasses}>
				{components}
			</div>
			{sections}
		</div>
	);
};

ComponentsRenderer.propTypes = {
	components: PropTypes.array.isRequired,
	sections: PropTypes.node.isRequired,
	isListPage: PropTypes.bool.isRequired,
	onSearchTermChange: PropTypes.func.isRequired,
	onSearchBlur: PropTypes.func.isRequired,
	searchTerm: PropTypes.string.isRequired,
};

export default ComponentsRenderer;
