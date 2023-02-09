import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Examples from 'rsg-components/Examples';
import SectionHeading from 'rsg-components/SectionHeading';
import JsDoc from 'rsg-components/JsDoc';
import Markdown from 'rsg-components/Markdown';
import Slot from 'rsg-components/Slot';
import ReactComponentRenderer from 'rsg-components/ReactComponent/ReactComponentRenderer';
import Context, { StyleGuideContextContents } from 'rsg-components/Context';
import ExamplePlaceholderDefault from 'rsg-components/ExamplePlaceholder';
import { DOCS_TAB_USAGE } from '../slots';
import { DisplayModes, UsageModes } from '../../consts';
import * as Rsg from '../../../typings';

const ExamplePlaceholder =
	process.env.STYLEGUIDIST_ENV !== 'production' ? ExamplePlaceholderDefault : () => <div />;

interface ReactComponentProps {
	component: Rsg.Component;
	depth: number;
	exampleMode?: string;
	usageMode?: string;
}

interface ReactComponentState {
	activeTab?: string;
}

export default class ReactComponent extends Component<ReactComponentProps, ReactComponentState> {
	public static propTypes = {
		component: PropTypes.object.isRequired,
		depth: PropTypes.number.isRequired,
		exampleMode: PropTypes.string.isRequired,
		usageMode: PropTypes.string.isRequired,
	};

	public static contextType = Context;

	public state = {
		activeTab: this.props.usageMode === UsageModes.expand ? DOCS_TAB_USAGE : undefined,
	};

	private handleTabChange = (name: string) => {
		this.setState((state) => ({
			activeTab: state.activeTab !== name ? name : undefined,
		}));
	};

	public render() {
		const { activeTab } = this.state;
		const {
			displayMode,
			config: { pagePerSection },
		} = this.context as StyleGuideContextContents;
		const { component, depth, usageMode, exampleMode } = this.props;
		const { name, visibleName, slug = '-', filepath, pathLine, href } = component;
		const { description = '', examples = [], tags = {} } = component.props || {};
		if (!name) {
			return null;
		}
		const showUsage = usageMode !== UsageModes.hide;

		return (
			<ReactComponentRenderer
				name={name}
				slug={slug}
				filepath={filepath}
				pathLine={pathLine}
				docs={<JsDoc {...tags} />}
				description={description && <Markdown text={description} />}
				heading={
					<SectionHeading
						id={slug}
						pagePerSection={pagePerSection}
						deprecated={!!tags.deprecated}
						slotName="componentToolbar"
						slotProps={{
							...component,
							isolated: displayMode !== DisplayModes.all,
						}}
						href={href}
						depth={depth}
					>
						{visibleName}
					</SectionHeading>
				}
				examples={
					examples.length > 0 ? (
						<Examples examples={examples} name={name} exampleMode={exampleMode} />
					) : (
						<ExamplePlaceholder name={name} />
					)
				}
				tabButtons={
					showUsage && (
						<Slot
							name="docsTabButtons"
							active={activeTab}
							props={{ ...component, onClick: this.handleTabChange }}
						/>
					)
				}
				tabBody={<Slot name="docsTabs" active={activeTab} onlyActive props={component} />}
			/>
		);
	}
}
