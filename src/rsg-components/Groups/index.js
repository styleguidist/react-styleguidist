import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Tabs } from 'antd';

import styleguide from 'store/styleguide';

import './index.scss';

const TabPane = Tabs.TabPane;

@observer
export default class HocTableOfContents extends Component {

	static contextTypes = {
		config: PropTypes.object,
	};

	handleChange = (type) => {
		styleguide.setType(type);
	};

	render() {

		const cfg = this.context.config;

		// if no groups in config, skip
		if (!this.context.config.groups) return null;

		return (
			<Tabs className="groups" defaultActiveKey={cfg.groupsOptions.defaultGroup} onChange={this.handleChange}>
				{Object.entries(cfg.groups).map(([key, group]) => {
					return (
						<TabPane className="groups__pane" key={key} tab={group.title}>
							<div className="groups__content">
								<h2 className="groups__title">{group.description}</h2>
							</div>
						</TabPane>
					);
				})}
			</Tabs>
		);
	}
}
