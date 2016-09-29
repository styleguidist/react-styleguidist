import React, { Component, PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';
import Props from 'rsg-components/Props';
import Playground from 'rsg-components/Playground';

const ReactComponent = (Renderer) => class extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		component: PropTypes.object.isRequired,
		sidebar: PropTypes.bool.isRequired,
	};

	renderDescription(props) {
		if (!props || !props.description) {
			return null;
		}

		return (<Markdown text={props.description} />);
	}

	renderProps(props) {
		if (!props || !props.props) {
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

		return examples.map((example, index) => {
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
				default:
					return null;
			}
		});
	}

	render() {
		const { highlightTheme, component, sidebar } = this.props;

		return (
            <div className="rsg-react-component">
                <Renderer
    				name={component.name}
    				pathLine={component.pathLine}
    				description={this.renderDescription(component.props)}
    				propList={this.renderProps(component.props)}
    				designMarkdown={this.renderExamples(highlightTheme, component.designMarkdown)}
    				examples={this.renderExamples(highlightTheme, component.examples)}
    				sidebar={sidebar}
    			/>
            </div>
		);
	}
};

export default ReactComponent;
