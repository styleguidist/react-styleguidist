import React, { Component, PropTypes } from 'react';

import s from './TableOfContents.css';

class TableOfContents extends Component {

	constructor(props) {
		super(props);

		this.state = {
			searchTerm: ''
		};
	}

	render() {
		const { searchTerm } = this.state;
		const { components } = this.props;

		let filteredComponents = components;

		if (searchTerm !== '') {
			filteredComponents = components.filter(
				(component) => component.name.match(new RegExp(searchTerm, 'gi'))
			);
		}

		return (
			<div className={s.root}>
				<input
					className={s.search}
					placeholder="Find component..."
					onChange={(e) => this.setState({ searchTerm: e.target.value })}
					value={searchTerm}
				/>
				<ul className={s.list}>
					{filteredComponents.map(({name}) => (
						<li className={s.item} key={name}>
							<a className={s.link} href={'#' + name}>{name}</a>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

TableOfContents.propTypes = {
	components: PropTypes.array.isRequired
};

export default TableOfContents;
