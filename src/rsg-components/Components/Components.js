import React, { Component, PropTypes } from 'react';
import ReactComponent from 'rsg-components/ReactComponent';
import Sections from 'rsg-components/Sections';
import ComponentsRenderer from 'rsg-components/Components/ComponentsRenderer';

const KEY_CODES = {
	F_KEY: 102,
	ESC_KEY: 27,
	ENTER_KEY: 13,
};

let searchFocused = false;

const handleSearchBlur = () => {
	searchFocused = false;
};

export default class Components extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		components: PropTypes.array.isRequired,
		sections: PropTypes.array.isRequired,
		sidebar: PropTypes.bool,
	};

	constructor(props) {
		super(props);
		this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);

		this.state = {
			searchTerm: '',
		};
	}

	componentDidMount() {
		window.addEventListener('keypress', this.handleKeyPress);
	}

	componentWillUnmount() {
		window.removeEventListener('keypress', this.handleKeyPress);
	}

	handleKeyPress(ev) {
		if (ev.keyCode === KEY_CODES.F_KEY && !searchFocused) {
			searchFocused = true;
			ev.preventDefault();
			this.refs['search-input'].focus();
		}
		if (ev.keyCode === KEY_CODES.ESC_KEY) {
			ev.preventDefault();
			window.location.hash = '#';
		}
	}

	handleSearchTermChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

	renderComponents() {
		const { highlightTheme, components, sidebar } = this.props;
		let filteredComponents = components;

		if (this.state.searchTerm !== '') {
			let regExp = new RegExp(this.state.searchTerm.split('').join('.*'), 'gi');
			filteredComponents = components.filter(component => {
				return component.name.match(regExp);
			});
		}

		return filteredComponents.map(component => {
			return (
				<ReactComponent
					key={component.filepath}
					highlightTheme={highlightTheme}
					component={component}
					sidebar={sidebar}
				/>
			);
		});
	}

	renderSections() {
		const { highlightTheme, sections, sidebar } = this.props;

		return (
			<Sections
				highlightTheme={highlightTheme}
				sections={sections}
				sidebar={sidebar}
			/>
		);
	}

	render() {
		return (
			<ComponentsRenderer
				isListPage={this.props.sidebar}
				searchTerm={this.state.searchTerm}
				components={this.renderComponents()}
				sections={this.renderSections()}
				onSearchTermChange={this.handleSearchTermChange}
				onSearchBlur={handleSearchBlur}
			/>
		);
	}
}
