import React, { Component, PropTypes } from 'react';
import ReactComponent from 'rsg-components/ReactComponent';
import Renderer from 'rsg-components/ReactComponent/Renderer';
import Sections from 'rsg-components/Sections';
import merge from 'lodash/merge';
import flatMapDeep from 'lodash/flatMapDeep';

const componentFileNameRegEx = /([\w-]+)\/[\w-]+\.jsx?$/i;
const tagParseRegEx = /@tags(\{.*\})/;

const checkTags = (tagList, regExp) => {
	for (let i = 0; i < tagList.length; i++) {
		if (tagList[i].match(regExp)) {
			return true;
		}
	}

	return false;
};

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
		console.log('Constructor ran')
		super(props);

		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onTagClicked = this.onTagClicked.bind(this);

		let allTags = {};
		let componentParents = [];

		props.components.forEach(component => {
			const folderName = component.pathLine.match(componentFileNameRegEx)[1];
			const designContent = requireExample(folderName);
			let tags = {};

			// requireExample will return false if the file wasn't found
			if (designContent !== false) {
				const match = designContent.content.match(tagParseRegEx);

				if (match) {
					const decoded = match[1].replace(/&quot;/g, '"');
					tags = JSON.parse(decoded);
					merge(allTags, tags);
				}
			}

			componentParents.push({
				designContent,
				component,
				tags: flatMapDeep(tags)
			});
		});

		const selectedTags = {};
		const tagTypes = Object.keys(allTags);

		tagTypes.forEach(type => {
			selectedTags[type] = '';
		});

		this.state = {
			searchTerm: '',
			searchFocused: false,
			tags: allTags,
			selectedTags,
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
				return componentParent.component.name.match(regExp) ||
					checkTags(componentParent.tags, regExp);
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
					tags={componentParent.tags}
				/>
			);
		});
	}

	onFocus() {
		this.setState({
			searchFocused: true
		});
	}

	onBlur() {
		// this.setState({
		//     searchFocused: false
		// })
	}

	onTagClicked(isTag, name, type) {
		if (!isTag) {
			type = name;
		}

		var obj = {
			[type]: isTag ? name : true
		};

		this.setState({
			selectedTags: merge(this.state.selectedTags, obj)
		});
	}

	render() {
		const { searchTerm } = this.state;
		const tagTypes = Object.keys(this.state.tags);

		const tagHTML = tagTypes.map(type => {
			const tags = this.state.tags[type];

			return (
				<div key={type}>
					<div onClick={() => { this.onTagClicked(false, type) }}>{type}</div>
					{tags.map(tag => <div key={tag} onClick={() => { this.onTagClicked(true, tag, type) }}>{tag}</div>)}
				</div>
			);
		});

		let selectedSearchTags = [];
		for (let tagType in this.state.selectedTags) {
			if (!!this.state.selectedTags[tagType]) {
				selectedSearchTags.push((<span key={tagType}>{tagType}: {this.state.selectedTags[tagType]}</span>));
			}
		}

		return (
			<div>
				{this.props.sidebar && (
					<div>
						<div>Library</div>
						<div>
							{selectedSearchTags}
						</div>
						<input
							placeholder="Search"
							onFocus={this.onFocus}
							onBlur={this.onBlur}
							onChange={event => this.setState({ searchTerm: event.target.value })}
							value={searchTerm}
						/>
					</div>
				)}
				{this.state.searchFocused && tagHTML}
				{this.renderComponents(searchTerm)}
			</div>
		);
	}
}
