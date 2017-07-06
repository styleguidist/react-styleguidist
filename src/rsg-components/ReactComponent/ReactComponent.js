import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Examples from 'rsg-components/Examples';
import SectionHeading from 'rsg-components/SectionHeading';
import JsDoc from 'rsg-components/JsDoc';
import Markdown from 'rsg-components/Markdown';
import Slot from 'rsg-components/Slot';
import ReactComponentRenderer from 'rsg-components/ReactComponent/ReactComponentRenderer';
import { DOCS_TAB_USAGE } from '../slots';

const ExamplePlaceholder =
	process.env.NODE_ENV !== 'production'
		? require('rsg-components/ExamplePlaceholder').default
		: () => <div />;

export default class ReactComponent extends Component {
	static propTypes = {
		component: PropTypes.object.isRequired,
	};
	static contextTypes = {
		config: PropTypes.object.isRequired,
		isolatedComponent: PropTypes.bool,
	};

	constructor(props, context) {
		super(props, context);
		const { showUsage } = context.config;

		this.handleTabChange = this.handleTabChange.bind(this);

		this.state = {
			activeTab: showUsage ? DOCS_TAB_USAGE : undefined,
		};
	}

	handleTabChange(name) {
		this.setState(state => ({
			activeTab: state.activeTab !== name ? name : undefined,
		}));
	}

	render() {
		const { activeTab } = this.state;
		const { isolatedComponent } = this.context;
		const { component } = this.props;
		const { name, slug, pathLine } = component;
		const { description, examples = [], tags = {} } = component.props;
		if (!name) {
			return null;
		}

		return (
			<ReactComponentRenderer
				name={name}
				slug={slug}
				pathLine={pathLine}
				docs={<JsDoc {...tags} />}
				description={description && <Markdown text={description} />}
				heading={
					<SectionHeading
						id={slug}
						deprecated={!!tags.deprecated}
						slotName="componentToolbar"
						slotProps={{
							...component,
							isolated: isolatedComponent,
						}}
					>
						{name}
					</SectionHeading>
				}
				examples={
					examples.length > 0
						? <Examples examples={examples} name={name} />
						: <ExamplePlaceholder name={name} />
				}
				tabButtons={
					<Slot
						name="docsTabButtons"
						active={activeTab}
						props={{ ...component, onClick: this.handleTabChange }}
					/>
				}
				tabBody={<Slot name="docsTabs" active={activeTab} onlyActive props={component} />}
			/>
		);
	}
}
