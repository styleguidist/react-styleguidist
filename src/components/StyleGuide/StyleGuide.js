import React, { PropTypes } from 'react';
import Components from 'components/Components/Components';

import s from './styles.css';

export default React.createClass({
	displayName: 'StyleGuide',
	propTypes: {
		components: PropTypes.array.isRequired
	},

	// TODO: Blank slate

	render() {
		return (
			<div className={s.root}>
				<h1 className={s.heading}>Style guide</h1>
				<div>
					<Components components={this.props.components}/>
				</div>
			</div>
		);
	}
});
