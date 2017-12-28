import React, { Component } from 'react';
import { observer } from 'mobx-react';

import styleguide from '../../store/styleguide';

import './index.scss';

@observer
export default class HocTableOfContents extends Component {

	handleChange = (type) => {
		styleguide.setType(type);
		console.log(styleguide.getType());
	};

	render() {
		return (
			<div>
				<Button onClick={this.handleChange.bind(this, 'core')}>CORE</Button>
				<Button onClick={this.handleChange.bind(this, 'default')}>Documentation</Button>
			</div>
		);
	}
}
