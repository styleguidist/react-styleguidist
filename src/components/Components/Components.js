import { Component, PropTypes } from 'react';
import ReactComponent from 'components/ReactComponent';

export default class Components extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		components: PropTypes.array.isRequired
	}

	renderComponents() {
		let { highlightTheme, components } = this.props;

		return components.map((component) => {
			return (
				<ReactComponent highlightTheme={highlightTheme} component={component} key={component.name}/>
			);
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
