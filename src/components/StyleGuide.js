import React, { PropTypes } from 'react';
import Components from './Components';

export default React.createClass({
	displayName: 'StyleGuide',
	propTypes: {
		components: PropTypes.array.isRequired
	},

	// TODO: Blank slate

	render() {
		return (
			<div>
				<h1>Style guide</h1>
				<div>
					<Components components={this.props.components}/>
				</div>
			</div>
		);
	}
});
