import React, { Component, PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';
import Props from 'rsg-components/Props';
import Playground from 'rsg-components/Playground';

class ReactComponent extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		component: PropTypes.object.isRequired
	};

	renderDescription() {
		let description = this.props.component.props.description;
		if (!description) {
			return null;
		}

		return (<Markdown text={description}/>);
	}

	renderProps() {
		let props = this.props.component.props;
		if (!props.props) {
			return null;
		}

		return (
			<Props props={props}/>
		);
	}

	renderExamples() {
		let { highlightTheme, component } = this.props;
		if (!component.examples) {
			return null;
		}

		return component.examples.map((example, index) => {
			switch (example.type) {
				case 'code':
					return (
						<Playground
							code={example.content}
							evalInContext={example.evalInContext}
							highlightTheme={highlightTheme}
							key={index}
						/>
					);
				case 'markdown':
					return (
						<Markdown
							text={example.content}
							key={index}
						/>
					);
			}
		});
	}

	render() {
		let { name, pathLine } = this.props.component;

		//return (
		//	<Renderer
		//		name={name}
		//		pathLine={pathLine}
		//	  description={this.renderDescription()}
		//	  propList={this.renderProps()}
		//	  examples={this.renderExamples()}
		//	/>
		//);

		return React.createElement(this.props.renderer, {
			name,
			pathLine,
			description: this.renderDescription(),
			propList: this.renderProps(),
			examples: this.renderExamples()
		});
	}
}

export default ReactComponent;
