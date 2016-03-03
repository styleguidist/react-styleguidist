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
		let { searchTerm } = this.state;
		let { components } = this.props;

		searchTerm = searchTerm.trim();
		if (searchTerm !== '') {
			components = components.filter(
				component => component.name.match(new RegExp(searchTerm, 'gi'))
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
					{components.map(({ name }) => (
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
