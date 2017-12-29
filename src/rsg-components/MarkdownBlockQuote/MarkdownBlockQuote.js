/* eslint "react/sort-comp": "off" */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export default class MarkdownBlockQuote extends Component {

	static propTypes = {
		isRhs: PropTypes.bool.isRequired,
		children: PropTypes.node.isRequired,
	};

	static contentToId = function(node) {
		const extractedString = node[0].props.children[0];
		return extractedString.replace(/\W/g,'')
	};

	state = {
		stylePosition: {},
	};

	componentDidMount() {
		if (this.props.isRhs) {
			setTimeout(() => {
				this.setStylePosition();
			})
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
				top: element.offsetTop,
				left: '0px',
			}
		});
	};

	render() {

		if (!this.props.isRhs) {
			return (
				<div
					className="blockQuote blockQuote--hidden"
					id={MarkdownBlockQuote.contentToId(this.props.children)}
				/>
			)
		}

		return (
			<div className="blockQuote" style={this.state.stylePosition}>{this.props.children}</div>
		);

	}

}
