import React, { Component, PropTypes } from 'react';
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
					<div className="bg-white w-100 pv2">
						<div className="mw8 center ph3">
							<input
								className="db w-100 pa2"
								placeholder="Search"
								onChange={this.onSearchTermChange}
								value={searchTerm}
								type="search"
							/>
						</div>
					</div>
				)}
				<div className="w-100 mw8 center ph3">
					{this.renderComponents(searchTerm)}
				</div>
			</div>
		);
	}
}
