import { Component, PropTypes } from 'react';
import Components from 'components/Components';

import s from './StyleGuide.css';

export default class StyleGuide extends Component {
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
				<h1 className={s.heading}>{title}</h1>
				<div>
					<Components highlightTheme={highlightTheme} components={components}/>
				</div>
			</div>
		);
	}
}
