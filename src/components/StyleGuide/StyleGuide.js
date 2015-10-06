import { Component, PropTypes } from 'react';
import Components from 'components/Components';

import s from './StyleGuide.css';

export default class StyleGuide extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		syntaxTheme: PropTypes.string,
		components: PropTypes.array.isRequired
	}

	// TODO: Blank slate

	render() {
		let { title, components, syntaxTheme } = this.props;

		return (
			<div className={s.root}>
				<h1 className={s.heading}>{title}</h1>
				<div>
					<Components syntaxTheme={syntaxTheme} components={components}/>
				</div>
			</div>
		);
	}
}
