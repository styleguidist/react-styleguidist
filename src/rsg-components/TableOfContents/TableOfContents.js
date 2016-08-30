import React, { Component, PropTypes } from 'react';
import { filterComponentsByName } from '../../utils/utils';

import s from './TableOfContents.css';

export default class TableOfContents extends Component {
	static propTypes = {
		components: PropTypes.array.isRequired,
		sections: PropTypes.array.isRequired,
	};

	constructor(props) {
		super(props);

		this.state = {
			searchTerm: '',
		};
	}

	renderComponents(components, searchTerm) {
		components = filterComponentsByName(components || [], searchTerm);
		return components.map(({ name }) => (
			<li className={s.item} key={name}>
				<a className={s.link} href={'#' + name}>{name}</a>
			</li>
		));
	}

	renderSection(sections, searchTerm) {
		sections = sections || [];
		return (sections || []).map(({ name, components: subComponents = [], sections: subSections }) => {
			subComponents = filterComponentsByName(subComponents, searchTerm);
			if (subComponents.length || !searchTerm) {
				return (
					<li key={name}>
						<a className={s.section} href={'#' + name}>{name}</a>
						{this.renderLevel(subComponents, subSections, searchTerm)}
					</li>
				);
			}
			return null;
		});
	}

	renderLevel(components, sections, searchTerm) {
		return (
			<ul className={s.list}>
				{this.renderComponents(components, searchTerm)}
				{this.renderSection(sections, searchTerm)}
			</ul>
		);
	}

	render() {
		let { searchTerm } = this.state;
		let { components, sections } = this.props;
		return (
			<div className={s.root}>
				<input
					value={searchTerm}
					className={s.search}
					placeholder="Filter by name"
					onChange={event => this.setState({ searchTerm: event.target.value })}
				/>
				{this.renderLevel(components, sections, searchTerm)}
			</div>
		);
	}
}
