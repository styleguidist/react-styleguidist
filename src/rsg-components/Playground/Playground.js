import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import Preview from 'rsg-components/Preview';
import Slot from 'rsg-components/Slot';
import PlaygroundRenderer from 'rsg-components/Playground/PlaygroundRenderer';
import { EXAMPLE_TAB_CODE_EDITOR } from '../slots';

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
		isolatedExample: PropTypes.bool,
	};

	constructor(props, context) {
		super(props, context);
		const { code } = props;
		const { previewDelay } = context.config;
		let { showCode } = this.context;
		if (props.settings && typeof props.settings.showcode === 'boolean') {
			showCode = props.settings.showcode;
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleTabChange = this.handleTabChange.bind(this);
		this.handleChange = debounce(this.handleChange, previewDelay);

		this.state = {
			code,
			activeTab: showCode ? EXAMPLE_TAB_CODE_EDITOR : undefined,
		};
	}

	componentWillReceiveProps(nextProps) {
		const { code } = nextProps;
		this.setState({
			code,
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState.code !== this.state.code || nextState.activeTab !== this.state.activeTab;
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
		const { evalInContext, index, name } = this.props;
		const { isolatedExample } = this.context;
		if (this.props.settings && this.props.settings.noeditor) {
			return (
				<PlaygroundRenderer
					name={name}
					preview={<Preview code={code} evalInContext={evalInContext} />}
				/>
			);
		}
		return (
			<PlaygroundRenderer
				name={name}
				preview={<Preview code={code} evalInContext={evalInContext} />}
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
						props={{ code, onChange: this.handleChange }}
					/>
				}
				toolbar={
					<Slot name="exampleToolbar" props={{ name, isolated: isolatedExample, example: index }} />
				}
			/>
		);
	}
}
