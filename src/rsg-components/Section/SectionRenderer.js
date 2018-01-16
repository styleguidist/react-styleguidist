import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';
import SectionHeading from 'rsg-components/SectionHeading';
import Markdown from 'rsg-components/Markdown';
import styleguide from 'store/styleguide';

import './section.scss';

const styles = ({ space }) => ({
	root: {
		marginBottom: space[4],
	},
});

export class SectionRenderer extends Component {

	static propTypes = {
		classes: PropTypes.object.isRequired,
		name: PropTypes.string,
		description: PropTypes.string,
		slug: PropTypes.string,
		content: PropTypes.node,
		contentAsArray: PropTypes.array,
		components: PropTypes.node,
		sections: PropTypes.node,
		isolated: PropTypes.bool,
		depth: PropTypes.number.isRequired,
	};

	static contextTypes = {
		config: PropTypes.object,
	};

	render() {
		const groupsConfig = this.context.config.groups[styleguide.type];

		// render no static views,
		// those will not have lhs and rhs separation
		if (!groupsConfig.includeStatic) {
			return (
				<div className="section section--standalone">
					{this.props.name && (
						<SectionHeading depth={this.props.depth} id={this.props.slug} type="section" slotName="sectionToolbar" slotProps={this.props}>
							{this.props.name}
						</SectionHeading>
					)}
					{this.props.description && <Markdown text={this.props.description} />}
					{this.props.content}
					{this.props.components}
					{this.props.sections}
				</div>
			);
		}

		// render with lhs and rhs separation
		return (
			<div>
				<section className="section section--flex">
					<div className="section__lhs">
						{this.props.name && (
							<SectionHeading depth={this.props.depth} id={this.props.slug} type="docs" slotName="sectionToolbar" slotProps={this.props}>
								{this.props.name}
							</SectionHeading>
						)}
						{this.props.description && <Markdown text={this.props.description} />}
						{this.props.content}
						{this.props.components}
					</div>
					<div className="section__rhs">
						{this.props.contentAsArray && this.props.contentAsArray.map((content, key) => (
							<div key={key}>{content}</div>
						))}
					</div>
				</section>
				{this.props.sections}
			</div>
		);
	}
}

export default Styled(styles)(SectionRenderer);
