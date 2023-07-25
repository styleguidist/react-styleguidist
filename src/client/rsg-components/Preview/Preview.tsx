import React, { useCallback, useContext, useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import PropTypes from 'prop-types';
import PlaygroundError from 'rsg-components/PlaygroundError';
import ReactExample from 'rsg-components/ReactExample';
import Context from 'rsg-components/Context';

interface PreviewProps {
	code: string;
	evalInContext(code: string): () => any;
}

export default function Preview({ code, evalInContext }: PreviewProps) {
	const [error, setError] = useState('');
	const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
	const { config, codeRevision } = useContext(Context);
	const [root, setRoot] = useState<Root>();

	const updateError = useCallback((err: Error) => {
		const errMessage = err
			.toString()
			.replace(
				'Check the render method of `StateHolder`.',
				'Check the code of your example in a Markdown file or in the editor below.'
			);
		setError(errMessage);
	}, []);

	const handleError = useCallback(
		(err: Error) => {
			updateError(err);
			console.error(err); // eslint-disable-line no-console
		},
		[updateError]
	);

	useEffect(
		function clearConsoleWithNewCodeRevision() {
			if (codeRevision > 0) {
				console.clear();
			}
		},
		[codeRevision]
	);

	useEffect(
		function clearErrorWithNewCode() {
			setError('');
		},
		[code]
	);

	useEffect(
		function createRootWithMountNode() {
			if (!mountNode) {
				return () => {
					// noop
				};
			}

			const newRoot = createRoot(mountNode);
			setRoot(newRoot);

			return () => {
				setTimeout(() => {
					newRoot.unmount();
				});
				setRoot(undefined);
			};
		},
		[mountNode]
	);

	useEffect(
		function renderExample() {
			if (!root) {
				return;
			}

			root.render(
				<ReactExample
					{...{
						code,
						evalInContext,
						onError: handleError,
						compilerConfig: config.compilerConfig,
					}}
				/>
			);
		},
		[evalInContext, config, handleError, code, root]
	);

	return (
		<>
			<div data-testid="mountNode" ref={setMountNode} />
			{error ? <PlaygroundError message={error} /> : <></>}
		</>
	);
}

FixedPreview.propTypes = {
	code: PropTypes.string.isRequired,
	evalInContext: PropTypes.func.isRequired,
};
