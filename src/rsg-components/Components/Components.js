import { Component, PropTypes } from 'react';
import ReactComponent from 'rsg-components/ReactComponent';
import Renderer from 'rsg-components/ReactComponent/Renderer';

export default class Components extends Component {
	static propTypes = {
		highlightTheme: PropTypes.string.isRequired,
		components: PropTypes.array.isRequired
	};

	renderComponents() {
		const { highlightTheme, components } = this.props;
		const ComponentRenderer = ReactComponent(Renderer);

		return components.map((component) => {
			return (<ComponentRenderer key={component.name} highlightTheme={highlightTheme} component={component} />);
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
