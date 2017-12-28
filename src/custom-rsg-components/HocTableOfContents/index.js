import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import styleguide from 'store/styleguide';

import './index.scss';

@observer
export default class HocTableOfContents extends Component {

	static contextTypes = {
		config: PropTypes.object,
	};

	handleChange = (type) => {
		styleguide.setType(type);
		console.log(styleguide.getType());
		console.warn(this.context.config);
	};

	render() {

		// if no groups in config, skip
		if (!this.context.config.groups) return null;

		return (
			<div>
				{Object.entries(this.context.config.groups).map(([key, group]) => {
					return (
						<Button key={key} onClick={this.handleChange.bind(this, key)}>{group.title}</Button>
					);
				})}
			</div>
		);
	}
}
