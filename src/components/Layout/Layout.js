import { Component, PropTypes } from 'react';
import Components from 'react-styleguidist/components/Components';

import s from './Layout.css';

export default class Layout extends Component {
	static propTypes = {
		config: PropTypes.object.isRequired,
		components: PropTypes.array.isRequired
	}

	// TODO: Blank slate

	render() {
		let { config, components } = this.props;
		let { title, highlightTheme } = config;

		return (
			<div className={s.root}>
				<div className={s.content}>
					<h1 className={s.heading}>{title}</h1>
					<div>
						<Components highlightTheme={highlightTheme} components={components}/>
					</div>
				</div>
			</div>
		);
	}
}
