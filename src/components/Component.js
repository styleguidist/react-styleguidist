import React, { PropTypes } from 'react';
import Props from './Props';
import Playground from './Playground';

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
			<div>
				<h2>{component.name}</h2>
				<Props props={component.props}/>
				{this.renderExamples()}
			</div>
		);
	}
});
