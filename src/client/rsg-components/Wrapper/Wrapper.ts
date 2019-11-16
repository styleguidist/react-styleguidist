import { Component } from 'react';
import PropTypes from 'prop-types';

export default class Wrapper extends Component<{ onError: (e: Error) => void }> {
	public static propTypes = {
		children: PropTypes.node.isRequired,
		onError: PropTypes.func.isRequired,
	};

	public componentDidCatch(error: Error) {
		this.props.onError(error);
	}

	public render() {
		return this.props.children;
	}
}
