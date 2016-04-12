import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import s from './TableOfContents.css';

class TableOfContents extends Component {
	renderLevel(components, sections) {
		return (
			<ul className={s.list}>
				{(components || []).map(({ name }) => (
					<li className={s.item} key={name}>
						<a className={s.link} href={'#' + name} onDoubleClick={this.props.onItemDoubleClick}>{name}</a>
					</li>
				))}
				{(sections || []).map(({ name, components: subComponents, sections: subSections }) => (
					<li key={name}>
						<a className={s.section} href={'#' + name}>{name}</a>
						{this.renderLevel(subComponents, subSections)}
					</li>
				))}
			</ul>
		);
	}

	render() {
		let { components, sections } = this.props;

		return (
			<div className={s.root}>
				<input
					className={s.search}
					placeholder="Filter by name"
					onChange={this.props.onInputChange}
					value={this.props.filter}
					ref='search'
				/>
				{this.renderLevel(components, sections)}
			</div>
		);
	}
}

TableOfContents.propTypes = {
	filter: PropTypes.string.isRequired,
	components: PropTypes.array.isRequired,
	sections: PropTypes.array.isRequired,
	onInputChange: PropTypes.func.isRequired,
	onItemDoubleClick: PropTypes.func.isRequired
};

export default TableOfContents;
