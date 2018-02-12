import React from 'react';
import { CodeRenderer } from './CodeRenderer';

describe('Code blocks', () => {
	it('should render code', () => {
		const code = '<button>OK</button>';
		const actual = shallow(<CodeRenderer classes={{}}>{code}</CodeRenderer>);

		expect(actual).toMatchSnapshot();
	});

	it('should render code to be highlighted', () => {
		const code = '<button>OK</button>';
		const actual = render(
			<CodeRenderer classes={{}} className="lang-html">
				{code}
			</CodeRenderer>
		);

		expect(actual).toMatchSnapshot();
	});
});
