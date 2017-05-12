import React from 'react';
import { EditorLoaderRenderer } from './EditorLoaderRenderer';

// We do not test Editor component because it requires Codemirror that do not work in Node environment.

it('renderer should render loader', () => {
	const actual = shallow(<EditorLoaderRenderer classes={{}} />);

	expect(actual).toMatchSnapshot();
});
