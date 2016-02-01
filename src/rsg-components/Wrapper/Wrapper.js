import React, { Component, PropTypes } from 'react';

class Wrapper extends Component {
	render() {
		return this.props.children;
	}
}

Wrapper.propTypes = {
	children: PropTypes.node.isRequired
};

export default Wrapper;
