import React, { PropTypes } from 'react';
import Components from 'components/Components/Components';

import s from './StyleGuide.css';

export default React.createClass({
	displayName: 'StyleGuide',
	propTypes: {
		title: PropTypes.string.isRequired,
		components: PropTypes.array.isRequired
	},

	// TODO: Blank slate

	render() {
		let { title, components } = this.props;

		return (
			<div className={s.root}>
				<h1 className={s.heading}>{title}</h1>
				<div>
					<Components components={components}/>
				</div>
			</div>
		);
	}
});
