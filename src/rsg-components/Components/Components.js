import React, { Component, PropTypes } from 'react';
import ReactComponent from 'rsg-components/ReactComponent';
import Renderer from 'rsg-components/ReactComponent/Renderer';
import Sections from 'rsg-components/Sections';

const componentFileNameRegEx = /([\w-]+)\/[\w-]+\.jsx?$/i;

// It's possible that for a given component, we don't have a README_DES.md file
const requireExample = (folderName) => {
	try {
		return require(`examples!sdk-components/${folderName}/README_DES.md`)[0];
	} catch(e) {
		return false;
	}
};

export default class Components extends Component {
	constructor(props) {
		super(props);
		this.onSearchTermChange = this.onSearchTermChange.bind(this)

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

	onSearchTermChange(event) {
		this.setState({ searchTerm: event.target.value })
	}

	render() {
		const { searchTerm } = this.state;

		return (
			<div>
				{this.props.sidebar && (
					<input
						placeholder="Search"
						onChange={this.onSearchTermChange}
						value={searchTerm}
					/>
				)}
				{this.renderComponents(searchTerm)}
			</div>
		);
	}
}
