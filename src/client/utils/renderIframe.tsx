import React, { useState, useCallback } from 'react';
import IframeError from 'rsg-components/IframeError';
import Wrapper from 'rsg-components/Wrapper';

export type ExamplesMap = {
	[file: string]: (Rsg.RuntimeCodeExample | Rsg.ExampleError | null)[];
};

interface IframeProps {
	examples: ExamplesMap;
	file?: string;
	exampleIndex?: number;
}

const Iframe = ({ examples, file, exampleIndex }: IframeProps) => {
	const [error, setError] = useState<string>();

	const handleError = useCallback((err: Error) => {
		setError(err.toString());
		console.error(err); // eslint-disable-line no-console
	}, []);

	if (file === undefined || exampleIndex === undefined) {
		return <IframeError message="Component and example index are required." />;
	}

	if (!examples[file]) {
		return <IframeError message="Cannot find an example for a given component." />;
	}

	const example = examples[file][exampleIndex];

	if (!example) {
		return <IframeError message="Cannot find an example with a given index." />;
	}

	if (error || example.type === 'error') {
		return <IframeError message={error || example.content} />;
	}

	const ExampleComponent = example.evalInContext(example.content);

	return (
		<Wrapper onError={handleError}>
			<ExampleComponent />
		</Wrapper>
	);
};

export default function renderIframe(props: IframeProps) {
	return <Iframe {...props} />;
}
