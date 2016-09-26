import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import ReactComponent from 'rsg-components/ReactComponent';
import Renderer from 'rsg-components/ReactComponent/Renderer';
import Sections from 'rsg-components/Sections';

const componentFileNameRegEx = /([\w-]+)\/[\w-]+\.jsx?$/i;

// It's possible that for a given component, we don't have a DESIGN_README.md file
const requireExample = (folderName) => {
	try {
		return require(`examples!sdk-components/${folderName}/DESIGN_README.md`)[0];
	} catch(e) {
		return false;
	}
};

let searchFocused = false

export default class Components extends Component {
	constructor(props) {
		super(props);
		this.onSearchTermChange = this.onSearchTermChange.bind(this)
		this.onKeyPress = this.onKeyPress.bind(this)

		let componentParents = [];

		props.components.forEach(component => {
			const folderName = component.pathLine.match(componentFileNameRegEx)[1];
			const designContent = requireExample(folderName);

			componentParents.push({
				designContent,
				component
			});
		});

		this.state = {
			searchTerm: '',
			componentParents
		};
	}

	componentDidMount() {
		this.props.sidebar && window.addEventListener('keypress', this.onKeyPress)
	}

	componentWillUnmount() {
		window.removeEventListener('keypress', this.onKeyPress)
	}

	renderComponents(searchTerm) {
		const { highlightTheme, sidebar } = this.props;
		const ComponentRenderer = ReactComponent(Renderer);
		let filteredComponents = this.state.componentParents;

		if (searchTerm !== '') {
			let regExp = new RegExp(searchTerm.split('').join('.*'), 'gi');
			filteredComponents = filteredComponents.filter(componentParent => {
				return componentParent.component.name.match(regExp);
			});
		};

		return filteredComponents.map((componentParent) => {
			return (
				<ComponentRenderer
					key={componentParent.component.filepath}
					highlightTheme={highlightTheme}
					component={componentParent.component}
					sidebar={sidebar}
					designContent={componentParent.designContent}
				/>
			);
		});
	}

	onKeyPress(e) {
		if (e.key === 'f' && !searchFocused) {
			searchFocused = true
			e.preventDefault()
			this.refs['search-input'].focus()
		}
	}

	onSearchTermChange(event) {
		this.setState({ searchTerm: event.target.value })
	}

	onSearchBlur() {
		searchFocused = false
	}

	render() {
		const { searchTerm } = this.state;
		const isListPage = this.props.sidebar;
		const componentSectionClasses = classNames('w-100 mw8 center ph3', {
			'pt-appbar-searchbar': isListPage,
			'pt-appbar': !isListPage
		});

		return (
			<div className={isListPage ? '' : 'bg-white'}>
				{isListPage ?
					<div className="fixed">
						<header className="w-content-ns bg-white flex justify-start items-center h4 bb b--black-20">
							<div className="w-100 mw8 center ph3">
								<h1 className="ma0">Components</h1>
							</div>
						</header>
						<div className="bg-white w-100 pv2 bb b--black-20">
							<div className="mw8 center ph3">
								<input
									ref="search-input"
									className="db w-100 pa2 bw1 br1 b--solid b--black-20"
									placeholder="What Are You Looking For?"
									onChange={this.onSearchTermChange}
									value={searchTerm}
									type="search"
									onBlur={this.onSearchBlur}
								/>
							</div>
						</div>
					</div>
				:
					<div>
						<header className="fixed w-100 bg-white h3 bb b--black-20">
							<div className="w-100 h-100 mw8 flex items-center justify-end center ph3">
								<a href="#">
									🙅
								</a>
							</div>
						</header>
					</div>
				}
				<div className={componentSectionClasses}>
					{this.renderComponents(searchTerm)}
				</div>
			</div>
		);
	}
}
