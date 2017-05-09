import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Wrapper extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
	};

	render() {
		return this.props.children;
	}
}
