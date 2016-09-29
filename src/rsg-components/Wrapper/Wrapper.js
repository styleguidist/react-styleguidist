import { Component, PropTypes } from 'react';

export default class Wrapper extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
	};

	render() {
		return (
            <div className="rsg-wrapper">
                {this.props.children}
            </div>
        );
	}
}
