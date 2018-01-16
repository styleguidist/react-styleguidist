/* eslint "react/sort-comp": "off" */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import './index.scss';

export default class MarkdownBlockQuote extends Component {

	static propTypes = {
		isRhs: PropTypes.bool.isRequired,
		children: PropTypes.node.isRequired,
	};

	static contentToId = function(node) {
		let extractedChild = null;

		if (node.props && node.props.children) {
			if (node.props.children[0].props) {
				extractedChild = node.props.children[0].props.children[0];
			} else {
				extractedChild = node.props.children[0];
			}
		} else if (node[0].props.children[0].props) {
			extractedChild = node[0].props.children[0].props.children[0].props
		} else {
			extractedChild = node[0].props.children[0];
		}

		return extractedChild.replace(/\W/g,'');
	};

	state = {
		stylePosition: {},
	};

	componentDidMount() {
		if (this.props.isRhs) {
			setTimeout(() => {
				this.setStylePosition();
			}, 200)
		}
	}

	setStylePosition = (limit = 5) => {
		const rootNode = ReactDOM.findDOMNode(this);

		// if sibling exists
		let sibling = rootNode.parentElement.previousSibling;
		if (sibling) {
			sibling = sibling.querySelector('.blockQuote');
		}

		const id = MarkdownBlockQuote.contentToId(this.child);
		const element = document.getElementById(id);
		if (!element) {
			setTimeout(() => {
				// try again if element not found
				limit--;
				if (!limit) return;
				this.setStylePosition(limit);
			}, 800);
			return;
		}

		let top = element.offsetTop;
		// set last position
		// rootNode.parentElement.parentElement.setAttribute('data-position', element.offsetTop);
		if (sibling) {
			if ((sibling.offsetTop + sibling.getBoundingClientRect().height) > top) {
				top += (sibling.offsetTop + sibling.getBoundingClientRect().height) - top + 5;
			}
		}

		this.setState({
			stylePosition: {
				position: 'absolute',
				top,
				left: '0px',
			}
		});
	};

	render() {

		this.child = this.props.children;

		if (!this.props.isRhs) {
			return (
				<div>
					{this.props.children.map((child, key) => {
						const id = MarkdownBlockQuote.contentToId(child);
						return (
							<div
								key={key}
								className="blockQuote blockQuote--hidden"
								id={id}
							>
								{id}
							</div>
						);
					})}
				</div>
			)
		}

		// is nested blockQuote ?
		// handle md of: ">> some text"
		// render as plain text instead of blockQuote with darker color
		if (this.props.children[0].props.children[0].props) {
			this.child = this.props.children[0].props.children;
			console.warn(this.props.children);
			return (
				<div className="blockQuote blockQuote--plain" style={this.state.stylePosition}>{this.props.children[0].props.children}</div>
			);
		}

		return (
			<div className="blockQuote" style={this.state.stylePosition}>{this.props.children}</div>
		);
	}
}
