import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import { CodeRenderer } from './CodeRenderer';

describe('Code blocks', () => {
	it('should render code', () => {
		const code = '<button>OK</button>';
		const renderer = createRenderer();
		renderer.render(<CodeRenderer classes={{}}>{code}</CodeRenderer>);

		expect(renderer.getRenderOutput()).toMatchSnapshot();
	});
});
