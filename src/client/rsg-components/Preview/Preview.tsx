import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Context from 'rsg-components/Context';

interface PreviewProps {
	code: string;
	filepath: string;
	index: number;
}

interface PreviewState {
	error: string | null;
}

export default class Preview extends Component<PreviewProps, PreviewState> {
	public static propTypes = {
		code: PropTypes.string.isRequired,
		filepath: PropTypes.string.isRequired,
	};
	public static contextType = Context;

	public componentDidMount() {
		// Clear console after hot reload, do not clear on the first load
		// to keep any warnings
		if (this.context.codeRevision > 0) {
			// eslint-disable-next-line no-console
			console.clear();
		}
	}

	// TODO: We should never rerender iframe but send new code to it
	public shouldComponentUpdate(nextProps: PreviewProps, nextState: PreviewState) {
		return this.state.error !== nextState.error || this.props.code !== nextProps.code;
	}

	public componentDidUpdate(prevProps: PreviewProps) {
		if (this.props.code !== prevProps.code) {
			this.sendCode();
		}
	}

	private sendCode() {
		const { code } = this.props;
		if (!code) {
			// eslint-disable-next-line no-useless-return
			return;
		}

		// TODO: send code to iframe
	}

	public render() {
		const { filepath, index } = this.props;
		// TODO: title
		return (
			<iframe
				src={`iframe?file=${encodeURIComponent(filepath)}&exampleIndex=${index}`}
				title={`TODO`}
			></iframe>
		);
	}
}
