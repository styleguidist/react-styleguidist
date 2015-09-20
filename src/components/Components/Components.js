import { Component, PropTypes } from 'react';
import ReactComponent from 'components/ReactComponent';

export default class Components extends Component {
	static propTypes = {
		components: PropTypes.array.isRequired
	}

	renderComponents() {
		return this.props.components.map((component) => {
			return (
				<ReactComponent component={component} key={component.name}/>
			)
		});
	}

	render() {
		return (
			<div>
				{this.renderComponents()}
			</div>
		);
	}
}
