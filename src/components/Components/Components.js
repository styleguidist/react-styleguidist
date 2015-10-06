import { Component, PropTypes } from 'react';
import ReactComponent from 'components/ReactComponent';

export default class Components extends Component {
	static propTypes = {
		syntaxTheme: PropTypes.string,
		components: PropTypes.array.isRequired
	}

	renderComponents() {
		let { syntaxTheme, components } = this.props;

		return components.map((component) => {
			return (
				<ReactComponent syntaxTheme={syntaxTheme} component={component} key={component.name}/>
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
