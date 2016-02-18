import { Component, PropTypes } from 'react';
import ReactComponent from 'rsg-components/ReactComponent';
import Renderer from 'rsg-components/ReactComponent/Renderer';

export default class Components extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		components: PropTypes.array.isRequired
	};

	renderComponents() {
		let { highlightTheme, components } = this.props;

		return components.map((component) => {
			return (
				<ReactComponent highlightTheme={highlightTheme} component={component} key={component.name} renderer={Renderer} />
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
