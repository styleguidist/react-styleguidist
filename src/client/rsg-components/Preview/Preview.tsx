import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Context from 'rsg-components/Context';
import ReactExample from 'rsg-components/ReactExample';
import PlaygroundError from 'rsg-components/PlaygroundError';

interface PreviewProps {
	code: string;
	filepath: string;
	index: number;
	evalInContext(code: string): () => any;
}

interface PreviewState {
	error: string | null;
	height: number;
}

export default class Preview extends Component<PreviewProps, PreviewState> {
	public static propTypes = {
		code: PropTypes.string.isRequired,
		filepath: PropTypes.string.isRequired,
		evalInContext: PropTypes.func.isRequired,
	};
	public static contextType = Context;

	public state: PreviewState = {
		error: null,
		height: 20,
	};

	private iframeRef = React.createRef<HTMLIFrameElement>();

	public componentDidMount() {
		// Clear console after hot reload, do not clear on the first load
		// to keep any warnings
		if (this.context.codeRevision > 0) {
			// eslint-disable-next-line no-console
			console.clear();
		}

		this.executeCode();
	}

	public shouldComponentUpdate(nextProps: PreviewProps, nextState: PreviewState) {
		return (
			this.state.error !== nextState.error ||
			this.state.height !== nextState.height ||
			this.props.code !== nextProps.code
		);
	}

	public componentDidUpdate(prevProps: PreviewProps) {
		if (this.props.code !== prevProps.code) {
			this.executeCode();
		}
	}

	public componentWillUnmount() {
		this.unmountPreview();
	}

	private getMountNode() {
		// TODO: Do not render to body
		return this.iframeRef.current?.contentWindow?.document?.body;
	}

	private unmountPreview() {
		const node = this.getMountNode();
		if (!node) {
			return;
		}
		ReactDOM.unmountComponentAtNode(node);
	}

	private executeCode() {
		this.setState({
			error: null,
		});

		const { code } = this.props;
		if (!code) {
			return;
		}

		const wrappedComponent: React.FunctionComponentElement<any> = (
			<ReactExample
				code={code}
				evalInContext={this.props.evalInContext}
				onError={this.handleError}
				compilerConfig={this.context.config.compilerConfig}
			/>
		);

		window.requestAnimationFrame(() => {
			const node = this.getMountNode();
			if (!node) {
				return;
			}

			// this.unmountPreview();
			try {
				ReactDOM.render(wrappedComponent, node);
				this.createMutationObserver(node);
				this.handleResize();
			} catch (err) {
				this.handleError(err);
			}
		});
	}

	private createMutationObserver(node: HTMLElement) {
		// TODO: Destroy after unmount
		const observer = new MutationObserver(this.handleResize);
		observer.observe(node, {
			attributes: true,
			attributeOldValue: false,
			characterData: true,
			characterDataOldValue: false,
			childList: true,
			subtree: true,
		});
	}

	// TOOD: Debounce
	private handleResize = () => {
		const node = this.getMountNode();
		if (!node) {
			return;
		}

		this.setState(prevState => {
			const height = node.scrollHeight;
			if (prevState.height === height) {
				return null;
			}
			return { height };
		});
	};

	private handleError = (err: Error) => {
		this.unmountPreview();

		this.setState({
			error: err.toString(),
			height: 0,
		});

		console.error(err); // eslint-disable-line no-console
	};

	public render() {
		const { height, error } = this.state;
		// TODO: Global styles
		// TODO: title
		return (
			<>
				<iframe
					data-testid="mountNode"
					title="TODO"
					ref={this.iframeRef}
					height={height}
					frameBorder={0}
				></iframe>
				{error && <PlaygroundError message={error} />}
			</>
		);
	}
}
