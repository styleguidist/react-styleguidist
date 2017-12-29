import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MarkdownBlockQuote extends Component {

	static propTypes = {
		isRhs: PropTypes.bool.isRequired,
		children: PropTypes.node.isRequired,
	};

	state = {
		stylePosition: {},
	};

	static contentToId = function(node) {
		const extractedString = node[0].props.children[0];
		return extractedString.replace(/\W/g,'')
	};

	componentDidMount() {
		if (this.props.isRhs) {
			this.setStylePosition();
		}
	}

	setStylePosition = () => {
		const id = MarkdownBlockQuote.contentToId(this.props.children);
		const element = document.getElementById(id);
		if (!element) {
			setTimeout(() => {
				// try again if element not found
				this.setStylePosition();
			}, 200);
			return;
		}
		this.setState({
			stylePosition: {
				position: 'absolute',
				top: element.offsetTop - 0,
				left: '10px',
			}
		});
	};

	render() {

		if (!this.props.isRhs) {
			return (
				<div
					id={MarkdownBlockQuote.contentToId(this.props.children)}
					style={{ width: '100%', height: '0px', visibility: 'hidden' }}
				/>
			)
		}

		return (
			<div style={this.state.stylePosition}>{this.props.children}</div>
		);

	}

}
