import { Component, PropTypes } from 'react';
import Props from 'components/Props';
import Playground from 'components/Playground';

import s from './ReactComponent.css';

export default class ReactComponent extends Component {
	static propTypes = {
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
		let { examples } = this.props.component;
		if (!examples) {
			return null;
		}

		return examples.map((example, index) => {
			switch (example.type) {
				case 'code':
					return (
						<Playground code={example.content} key={index}/>
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
				{this.renderDescription()}
				<Props props={component.props}/>
				{this.renderExamples()}
			</div>
		);
	}
}
