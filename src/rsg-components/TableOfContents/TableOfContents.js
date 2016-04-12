import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import s from './TableOfContents.css';

class TableOfContents extends Component {
	renderLevel(components, sections) {
		return (
			<ul className={s.list}>
				{this.renderComponents(components)}
				{(sections || []).map(({ name, components: subComponents, sections: subSections }) => (
					<li key={name}>
						<a className={s.section} href={'#' + name}>{name}</a>
						{this.renderLevel(subComponents, subSections)}
					</li>
				))}
			</ul>
		);
	}

	renderComponents (components) {
		if (!components || !components.map) return null;
		return components.map((component) => {
			if (!component.visible) return null;
			console.log(component.active);
			return (
				<li className={classnames(s.item, {[s.inactive]: !component.active })} key={component.name}>
					<a className={s.link} href={'#' + component.name} onDoubleClick={this.props.onItemDoubleClick.bind(null, component)}>{component.name}</a>
				</li>
			)
		})
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
