import { Component, PropTypes } from 'react';
import Sticky from 'react-sticky';
import Components from 'rsg-components/Components';
import TableOfContents from 'rsg-components/TableOfContents';

import s from './Layout.css';

export default class Layout extends Component {
	static propTypes = {
		config: PropTypes.object.isRequired,
		components: PropTypes.array.isRequired
	};

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
		let { config, components } = this.props;

		return (
			<div className={s.root}>
				<main className={s.content}>
					<h1 className={s.heading}>{config.title}</h1>
					<div className={s.wrapper}>
						<div className={s.components}>
							{this.renderComponens()}
							<footer className={s.footer}>
								Generated with <a className={s.link} href="https://github.com/sapegin/react-styleguidist">React Styleguidist</a>
							</footer>
						</div>
						<div className={s.sidebar}>
							<Sticky className={s.sidebar} stickyClass={s.sidebarIsSticky} topOffset={-15} stickyStyle={{}}>
								<TableOfContents components={components}/>
							</Sticky>
						</div>
					</div>
				</main>
			</div>
		);
	}
}
