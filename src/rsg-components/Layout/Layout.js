import { Component, PropTypes } from 'react';
import Components from 'rsg-components/Components';
import TableOfContents from 'rsg-components/TableOfContents';

import s from './Layout.css';

const Layout = (Renderer) => class extends Component {
	static propTypes = {
		config: PropTypes.object.isRequired,
		components: PropTypes.array.isRequired
	};

	renderComponents(config, components) {
		if (components.length) {
			return (
				<Components highlightTheme={config.highlightTheme} components={components}/>
			);
		}
		else {
			return (
				<div className={s.empty}>
					No components found. <a className={s.link} href="https://github.com/sapegin/react-styleguidist#configuration">Check
					the components function</a> in your style guide config.
				</div>
			);
		}
	}

	renderTableOfContents(components) {
		return <TableOfContents components={components}/>;
	}

	render() {
		const { config, components } = this.props;

		return (
			<Renderer
				title={config.title}
				components={this.renderComponents(config, components)}
				toc={this.renderTableOfContents(components)}
			/>
		);
	}
};

export default Layout;
