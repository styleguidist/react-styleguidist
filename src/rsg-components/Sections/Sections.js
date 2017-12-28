import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import clone from 'lodash/cloneDeep';

import Section from 'rsg-components/Section';
import SectionsRenderer from 'rsg-components/Sections/SectionsRenderer';
import styleguide from 'store/styleguide';

import filterByGroups from '../../utils/filterByGroups';

@observer
export default class Sections extends Component {

	static propTypes = {
		sections: PropTypes.array.isRequired,
		root: PropTypes.bool,
		depth: PropTypes.number.isRequired,
	};

	static contextTypes = {
		config: PropTypes.object,
	};

	render() {

		const groupsConfig = this.context.config.groups[styleguide.type];
		// we can't modify props, lets clone them!
		let sections = clone(this.props.sections);

		// filter sections by groups
		// its not enough to just filter section.components,
		// as not all sections contains components ( static won't )
		sections = filterByGroups(sections, groupsConfig);

		return (
			<SectionsRenderer>
				{sections.map((section, idx) => {

					// filter section components by groups
					section.components = filterByGroups(section.components, groupsConfig);

					return (
						<Section key={idx} section={section} depth={this.props.depth} />
					);
				})}
			</SectionsRenderer>
		);
	}

}
