import { Component, PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';
import Props from 'rsg-components/Props';
import Playground from 'rsg-components/Playground';

import s from './ReactComponent.css';

export default class ReactComponent extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		component: PropTypes.object.isRequired
	};

	renderDescription() {
		let description = this.props.component.props.description;
		if (!description) {
			return null;
		}

		return (
			<div className={s.description}>
				<Markdown text={description}/>
			</div>
		);
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

		return (
			<div className={s.root}>
				<header className={s.header}>
					<h2 className={s.heading} id={name}>
						<a className={s.anchor} href={'#' + name}></a>
						{name}
					</h2>
					<div className={s.pathLine}>{pathLine}</div>
				</header>
				{this.renderDescription()}
				{this.renderProps()}
				{this.renderExamples()}
			</div>
		);
	}
}
