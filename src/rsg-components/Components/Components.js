import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import ReactComponent from 'rsg-components/ReactComponent';
import Renderer from 'rsg-components/ReactComponent/Renderer';
import Sections from 'rsg-components/Sections';
import Icon from 'rsg-components/Icon';

const KEY_CODES = {
	F_KEY: 102,
	ESC_KEY: 27,
	ENTER_KEY: 13
};

let searchFocused = false;

export default class Components extends Component {
	constructor(props) {
		super(props);
		this.onSearchTermChange = this.onSearchTermChange.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);

		this.state = {
			searchTerm: ''
		};
	}

	componentDidMount() {
		window.addEventListener('keypress', this.onKeyPress);
	}

	componentWillUnmount() {
		window.removeEventListener('keypress', this.onKeyPress);
	}

	renderComponentSection(searchTerm) {
		const { highlightTheme, components, sidebar } = this.props;
		const ComponentRenderer = ReactComponent(Renderer);
		let filteredComponents = components;

		if (searchTerm !== '') {
			let regExp = new RegExp(searchTerm.split('').join('.*'), 'gi');
			filteredComponents = components.filter(component => {
				return component.name.match(regExp);
			});
		};

		return filteredComponents.map((component) => {
			return (
				<ComponentRenderer
					key={component.filepath}
					highlightTheme={highlightTheme}
					component={component}
					sidebar={sidebar}
				/>
			);
		});
	}

    renderSearchHeader(searchTerm) {
        return (
            <div className="rsg-components__search-header fixed">
                <header className="w-content-ns bg-white flex justify-start items-center h4 bb b--black-20">
                    <div className="w-100 mw8 center ph2">
                        <h1 className="ma0 f2">Components</h1>
                    </div>
                </header>

                <div className="bg-white w-100 pv1 bb b--black-20">
                    <div className="mw8 center ph2">
                        <input
                            ref="search-input"
                            className="db w-100 ph1 h2_5 bw1 br1 b--solid b--black-20 lh-input trans-all shadow-hover"
                            placeholder="What Are You Looking For?"
                            onChange={this.onSearchTermChange}
                            value={searchTerm}
                            type="search"
                            onBlur={this.onSearchBlur}
                        />
                    </div>
                </div>
            </div>
        );
    }

    renderPlainHeader() {
        return (
            <div className="rsg-components__plain-header">
                <header className="fixed w-100 bg-white h3 bb b--black-20">
                    <div className="w-100 h-100 mw8 flex items-center justify-end center ph3">
                        <a href="#" className="db flex items-center justify-center" style={{ height: '44px', width: '44px' }}>
                            <Icon glyph="close" />
                        </a>
                    </div>
                </header>
            </div>
        );
    }

	onKeyPress(e) {
		if (e.keyCode === KEY_CODES.F_KEY && !searchFocused) {
			searchFocused = true;
			e.preventDefault();
			this.refs['search-input'].focus();
		}
		if (e.keyCode === KEY_CODES.ESC_KEY) {
			e.preventDefault();
			window.location.hash = "#";
		}
	}

	onSearchTermChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

	onSearchBlur() {
		searchFocused = false;
	}

	render() {
		const { searchTerm } = this.state;
		const isListPage = this.props.sidebar;
		const componentSectionClasses = classNames('rsg-components__component-section w-100 mw8 center ph2', {
			'pt-appbar-searchbar': isListPage,
			'pt-appbar': !isListPage
		});
        const classes = classNames('rsg-components', {
            'bg-white': !isListPage
        });

		return (
			<div className={classes}>
				{isListPage ? this.renderSearchHeader(searchTerm) : this.renderPlainHeader()}

				<div className={componentSectionClasses}>
					{this.renderComponentSection(searchTerm)}
				</div>
			</div>
		);
	}
}
