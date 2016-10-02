import React, { Component, PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';
import Props from 'rsg-components/Props';
import Examples from 'rsg-components/Examples';
import ReactComponentRenderer from 'rsg-components/ReactComponent/ReactComponentRenderer';

export default class ReactComponent extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		component: PropTypes.object.isRequired,
		sidebar: PropTypes.bool,
	};

	renderDescription(description) {
		if (!description) {
			return null;
		}

		return (
			<Markdown text={description} />
		);
	}

	renderProps(props) {
		if (!props.props) {
			return null;
		}

		return (
			<Props props={props} />
		);
	}

	renderExamples(highlightTheme, examples) {
		if (!examples) {
			return null;
		}

		return (
			<Examples highlightTheme={highlightTheme} examples={examples} />
		);
	}

	render() {
		const { highlightTheme, component, sidebar } = this.props;
		return (
			<ReactComponentRenderer
				name={component.name}
				pathLine={component.pathLine}
				description={this.renderDescription(component.props.description)}
				props={this.renderProps(component.props)}
				examples={this.renderExamples(highlightTheme, component.examples)}
				sidebar={sidebar}
			/>
		);
	}
}
