import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import Preview from 'rsg-components/Preview';
import Para from 'rsg-components/Para';
import Slot from 'rsg-components/Slot';
import PlaygroundRenderer from 'rsg-components/Playground/PlaygroundRenderer';
import Context, { StyleGuideContextContents } from 'rsg-components/Context';
import { EXAMPLE_TAB_CODE_EDITOR } from '../slots';
import { DisplayModes, ExampleModes } from '../../consts';

interface PlaygroundProps {
	evalInContext(code: string): () => any;
	index: number;
	name?: string;
	exampleMode?: string;
	code: string;
	settings: {
		showcode?: boolean;
		noeditor?: boolean;
		padded?: boolean;
		// TODO: better typing for this
		props?: any;
	};
}

interface PlaygroundState {
	code: string;
	prevCode: string;
	activeTab?: string;
}

class Playground extends Component<PlaygroundProps, PlaygroundState> {
	public static contextType = Context;

	private handleChange = debounce((code) => {
		this.setState({
			code,
		});
	}, (this.context as StyleGuideContextContents).config.previewDelay);

	public state: PlaygroundState = {
		code: this.props.code,
		prevCode: this.props.code,
		activeTab: this.getInitialActiveTab() ? EXAMPLE_TAB_CODE_EDITOR : undefined,
	};

	public static getDerivedStateFromProps(nextProps: PlaygroundProps, prevState: PlaygroundState) {
		const { code } = nextProps;
		if (prevState.prevCode !== code) {
			return {
				prevCode: code,
				code,
			};
		}
		return null;
	}

	public componentWillUnmount() {
		// Clear pending changes
		this.handleChange.cancel();
	}

	private getInitialActiveTab(): boolean {
		const expandCode = this.props.exampleMode === ExampleModes.expand;
		return this.props.settings.showcode !== undefined ? this.props.settings.showcode : expandCode;
	}

	private handleTabChange = (name: string) => {
		this.setState((state) => ({
			activeTab: state.activeTab !== name ? name : undefined,
		}));
	};

	public render() {
		const { code, activeTab } = this.state;
		const { evalInContext, index, name, settings, exampleMode } = this.props;
		const { displayMode } = this.context as StyleGuideContextContents;
		const isExampleHidden = exampleMode === ExampleModes.hide;
		const isEditorHidden = settings.noeditor || isExampleHidden;
		const preview = <Preview code={code} evalInContext={evalInContext} />;

		return isEditorHidden ? (
			<Para>{preview}</Para>
		) : (
			<PlaygroundRenderer
				name={name}
				exampleIndex={index}
				padded={!!settings.padded}
				preview={preview}
				previewProps={settings.props || {}}
				tabButtons={
					<Slot
						name="exampleTabButtons"
						active={activeTab}
						props={{ onClick: this.handleTabChange }}
					/>
				}
				tabBody={
					<Slot
						name="exampleTabs"
						active={activeTab}
						onlyActive
						// evalInContext passed through to support custom slots that eval code
						props={{ code, onChange: this.handleChange, evalInContext }}
					/>
				}
				toolbar={
					<Slot
						name="exampleToolbar"
						props={{ name, isolated: displayMode === DisplayModes.example, example: index }}
					/>
				}
			/>
		);
	}
}

export default Playground;
