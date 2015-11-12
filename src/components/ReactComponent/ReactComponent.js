import { Component, PropTypes } from 'react';
import Props from 'components/Props';
import Playground from 'components/Playground';

import s from './ReactComponent.css';

export default class ReactComponent extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		component: PropTypes.object.isRequired
	}

	renderDescription() {
		let description = this.props.component.props.description;
		if (!description) {
			return null;
		}

		return (
			<div className={s.description}>{description}</div>
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
						<Playground code={example.content} evalInContext={example.evalInContext} highlightTheme={highlightTheme} key={index} />
					);
				case 'html':
					return (
						<div dangerouslySetInnerHTML={{__html: example.content}} key={index}></div>
					);
			}
		});
	}

	render() {
		let { component } = this.props;
		return (
			<div className={s.root}>
				<h2 className={s.heading}>{component.name}</h2>
				<div className={s.sourcePath}>{component.relativePath}</div>
				{this.renderDescription()}
				<Props props={component.props}/>
				{this.renderExamples()}
			</div>
		);
	}
}
