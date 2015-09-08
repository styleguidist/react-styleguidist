import React, { PropTypes } from 'react';
import Props from 'components/Props/Props';
import Playground from 'components/Playground/Playground';

import s from './styles.css';

export default React.createClass({
	displayName: 'Component',
	propTypes: {
		component: PropTypes.object.isRequired
	},

	renderExamples() {
		return this.props.component.examples.map((example, index) => {
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
	},

	render() {
		let { component } = this.props;
		return (
			<div className={s.root}>
				<h2 className={s.heading}>{component.name}</h2>
				<Props props={component.props}/>
				{this.renderExamples()}
			</div>
		);
	}
});
