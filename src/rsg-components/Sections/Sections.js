import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import clone from 'lodash/cloneDeep';

import Section from 'rsg-components/Section';
import SectionsRenderer from 'rsg-components/Sections/SectionsRenderer';
import styleguide from 'store/styleguide';

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

		const cfg = this.context.config;
		// we can't modify props, lets clone them!
		const sections = clone(this.props.sections);

		return (
			<SectionsRenderer>
				{sections.map((section, idx) => {

					// filter section components by groups
					if (cfg.groups) {
						section.components = section.components.filter(
							(component) => cfg.groups[styleguide.type].pathRegExp.test(component.pathLine)
						);
					}

					return (
						<Section key={idx} section={section} depth={this.props.depth} />
					);
				})}
			</SectionsRenderer>
		);
	}

}
