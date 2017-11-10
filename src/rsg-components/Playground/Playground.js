import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import Container from 'rsg-components/Container';
import Preview from 'rsg-components/Preview';
import Para from 'rsg-components/Para';
import Slot from 'rsg-components/Slot';
import PlaygroundRenderer from 'rsg-components/Playground/PlaygroundRenderer';
import { EXAMPLE_TAB_CODE_EDITOR } from '../../plugins/code-editor';
import { DisplayModes } from '../../consts';

export default class Playground extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired,
		evalInContext: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		settings: PropTypes.object,
	};

	static contextTypes = {
		config: PropTypes.object.isRequired,
		displayMode: PropTypes.string,
	};

	constructor(props, context) {
		super(props, context);
		const { code, settings } = props;
		const { config } = context;
		const showCode = settings.showcode !== undefined ? settings.showcode : config.showCode;

		this.state = {
			code,
			activeTab: showCode ? EXAMPLE_TAB_CODE_EDITOR : undefined,
		};

		this.handleTabChange = this.handleTabChange.bind(this);
		this.handleChange = debounce(this.handleChange.bind(this), config.previewDelay);
	}

	componentWillReceiveProps(nextProps) {
		const { code } = nextProps;
		this.setState({
			code,
		});
	}

	componentWillUnmount() {
		// Clear pending changes
		this.handleChange.cancel();
	}

	handleChange(code) {
		this.setState({
			code,
		});
	}

	handleTabChange(name) {
		this.setState(state => ({
			activeTab: state.activeTab !== name ? name : undefined,
		}));
	}

	render() {
		const { code, activeTab } = this.state;
		const { evalInContext, index, name, settings } = this.props;

		const preview = <Preview code={code} evalInContext={evalInContext} />;

		if (settings.noeditor) {
			return <Para>{preview}</Para>;
		}

		const { displayMode } = this.context;
		const slotProps = {
			name,
			code,
			isolated: displayMode === DisplayModes.example,
			example: index,
			state: this.state,
			setState: this.setState.bind(this), // TODO: Bind in constructor
		};

		const previewContainer = ({ children }) => (
			<Container name="previewContainer" props={slotProps}>
				{children}
			</Container>
		);

		return (
			<PlaygroundRenderer
				{...this.state}
				name={name}
				preview={preview}
				previewProps={settings.props || {}}
				previewContainer={previewContainer}
				tabButtons={
					<Slot
						name="exampleTabButton"
						active={activeTab}
						props={{ ...slotProps, onClick: this.handleTabChange }}
					/>
				}
				tabBody={
					<Slot
						name="exampleTab"
						active={activeTab}
						onlyActive
						props={{ ...slotProps, onChange: this.handleChange }}
					/>
				}
				toolbar={<Slot name="exampleToolbarButton" props={slotProps} />}
			/>
		);
	}
}
