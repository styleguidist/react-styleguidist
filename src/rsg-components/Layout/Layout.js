import { Component, PropTypes } from 'react';
import Components from 'rsg-components/Components';

import s from './Layout.css';

export default class Layout extends Component {
	static propTypes = {
		config: PropTypes.object.isRequired,
		components: PropTypes.array.isRequired
	}

	renderComponens() {
		let { config, components } = this.props;
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

	render() {
		let { title } = this.props.config;

		return (
			<div className={s.root}>
				<div className={s.content}>
					<h1 className={s.heading}>{title}</h1>
					{this.renderComponens()}
					<footer className={s.footer}>
						Generated with <a className={s.link} href="https://github.com/sapegin/react-styleguidist">React Styleguidist</a>
					</footer>
				</div>
			</div>
		);
	}
}
