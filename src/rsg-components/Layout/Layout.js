import React, { Component, PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';
import Components from 'rsg-components/Components';

const DOCS_URL = 'https://github.com/sapegin/react-styleguidist/blob/master/docs/Configuration.md';

const Layout = (Renderer) => class extends Component {
	static propTypes = {
		config: PropTypes.object.isRequired,
		components: PropTypes.array.isRequired,
		sections: PropTypes.array.isRequired,
		sidebar: PropTypes.bool,
	};

	componentDidMount() {
		// We aren't using anything fancy like react-router, so we can't just use
		// a scroll-handling library. Here we go ...
		window.scrollTo(0, 0)
	}

	static defaultProps = {
		sidebar: true,
	};

	static childContextTypes = {
		config: PropTypes.object.isRequired,
	};

	getChildContext() {
		return {
			config: this.props.config,
		};
	}

	renderComponents(config, components, sections, sidebar) {
		if (!isEmpty(components) || !isEmpty(sections)) {
			return (
				<Components
					highlightTheme={config.highlightTheme}
					components={components}
					sections={sections}
					sidebar={sidebar}
				/>
			);
		}

		return (
			<div>
				No components found. <a href={DOCS_URL}>Check
					the <code>components</code> option</a> in your style guide config.
			</div>
		);
	}

	render() {
		let { config, components, sections, sidebar } = this.props;

		return (
			<Renderer
				title={config.title}
				components={this.renderComponents(config, components, sections, sidebar)}
				sections={sections}
				sidebar={sidebar}
			/>
		);
	}
};

export default Layout;
