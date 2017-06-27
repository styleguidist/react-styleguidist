import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import Preview from 'rsg-components/Preview';
import Slot from 'rsg-components/Slot';
import PlaygroundRenderer from 'rsg-components/Playground/PlaygroundRenderer';
import { EXAMPLE_TAB_CODE_EDITOR } from '../../plugins/code-editor';

export default class Playground extends Component {
	static propTypes = {
		code: PropTypes.string.isRequired,
		evalInContext: PropTypes.func.isRequired,
		index: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
	};
	static contextTypes = {
		config: PropTypes.object.isRequired,
		isolatedExample: PropTypes.bool,
	};

	constructor(props, context) {
		super(props, context);
		const { code } = props;
		const { previewDelay, showCode } = context.config;

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

	// TODO: Use isEqual?
	// shouldComponentUpdate(nextProps, nextState) {
	// 	return nextState.code !== this.state.code || nextState.activeTab !== this.state.activeTab;
	// }

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
		const slotProps = {
			name,
			code,
			isolated: isolatedExample,
			example: index,
			state: this.state,
			setState: this.setState.bind(this), // TODO: Bind in constructor
		};
		return (
			<PlaygroundRenderer
				{...this.state}
				name={name}
				preview={<Preview code={code} evalInContext={evalInContext} />}
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
