import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Context from 'rsg-components/Context';
import ReactExample from 'rsg-components/ReactExample';
import PlaygroundError from 'rsg-components/PlaygroundError';

// TODO: Use negative margins on the iframe and positive margin here,
// otherwise things like focus outlines aren't visible
const IFRAME_STYLES = `body { margin: 0 !important; padding: 0 !important }`;
const IFRAME_CONTENT = `<!DOCTYPE html><html><head><style>${IFRAME_STYLES}</style></head><body><div id="root"></div></body></html>`;

interface PreviewProps {
	code: string;
	codeRevision: number;
	evalInContext(code: string): () => any;
}

interface PreviewState {
	error: string | null;
	height: number;
}

export default class Preview extends PureComponent<PreviewProps, PreviewState> {
	public static propTypes = {
		code: PropTypes.string.isRequired,
		codeRevision: PropTypes.number.isRequired,
		evalInContext: PropTypes.func.isRequired,
	};
	public static contextType = Context;

	public state: PreviewState = {
		error: null,
		height: 20,
	};

	/** Example iframe ref */
	private iframeRef = React.createRef<HTMLIFrameElement>();

	/** Mutation observer to track size changes inside the example iframe */
	private observer: MutationObserver | null = null;

	/** Initial iframe HTML template already applied */
	private hasInitialContents = false;

	public componentDidMount() {
		// Clear console after hot reload, do not clear on the first load
		// to keep any warnings
		if (this.context.codeRevision > 0) {
			// eslint-disable-next-line no-console
			// console.clear();
		}

		this.executeCode();
	}

	public componentDidUpdate(prevProps: PreviewProps) {
		if (this.props.code !== prevProps.code || this.props.codeRevision !== prevProps.codeRevision) {
			this.executeCode();
		}
	}

	public componentWillUnmount() {
		this.disconnectObserver();
		this.unmountPreview();
	}

	private getDocument() {
		return this.iframeRef.current?.contentWindow?.document;
	}

	private getMountNode() {
		return this.getDocument()?.getElementById('root');
	}

	private unmountPreview() {
		const node = this.getMountNode();
		if (!node) {
			return;
		}
		ReactDOM.unmountComponentAtNode(node);
	}

	private disconnectObserver() {
		if (!this.observer) {
			return;
		}

		this.observer.disconnect();
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
			this.renderIframeContents();

			const node = this.getMountNode();
			if (!node) {
				return;
			}

			this.unmountPreview();
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
		this.disconnectObserver();
		this.observer = new MutationObserver(this.handleResize);
		this.observer.observe(node, {
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

	private renderIframeContents() {
		if (this.hasInitialContents) {
			return;
		}

		const doc = this.getDocument();
		if (!doc) {
			return;
		}

		doc.open('text/html', 'replace');
		doc.write(IFRAME_CONTENT);
		doc.close();

		console.log('🦊 write iframe');

		// Clone app styles from the collector iframe to our new example iframe
		const stylesCollectorIframeHead = document.querySelector<HTMLIFrameElement>(
			'[data-rsg-iframe="collector"]'
		)?.contentWindow?.document.head;
		console.log('🙀', stylesCollectorIframeHead);
		if (stylesCollectorIframeHead) {
			const styles = stylesCollectorIframeHead.getElementsByTagName('style');
			// eslint-disable-next-line compat/compat
			Array.from(styles).forEach(styleElement => {
				console.log('🐳 append', styleElement);
				doc.head.appendChild(styleElement.cloneNode(true));
			});
		}

		this.hasInitialContents = true;
	}

	public render() {
		const { height, error } = this.state;
		// TODO: Global styles
		// TODO: title
		return (
			<>
				<iframe
					data-rsg-iframe="preview"
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
