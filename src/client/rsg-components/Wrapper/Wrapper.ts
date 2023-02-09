import { Component } from 'react';
import PropTypes from 'prop-types';

interface Props {
	onError: (e: Error) => void;
	children?: React.ReactNode;
}
export default class Wrapper extends Component<Props> {
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
