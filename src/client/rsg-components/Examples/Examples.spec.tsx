/* eslint-disable @typescript-eslint/naming-convention */

import React from 'react';
import { render } from '@testing-library/react';
import Examples from '.';
import Context from '../Context';
import slots from '../slots';
import { DisplayModes } from '../../consts';
import config from '../../../scripts/schemas/config';
import * as Rsg from '../../../typings';

const compileExample = config.compileExample.default;

const module: Rsg.ExamplesModule = {
	default: () => null,
	__esModule: true,
	__documentScope: {},
	__exampleScope: {},
	__currentComponent: () => null,
	__examples: [],
};

const context = {
	config: {
		previewDelay: 0,
		compileExample,
	},
	codeRevision: 1,
	displayMode: DisplayModes.example,
	slots: slots(),
};

const Provider = (props: any) => <Context.Provider value={context} {...props} />;

test('should render examples', () => {
	const { getByText } = render(
		<Provider>
			<Examples content={module} componentName="button" exampleMode="collapse" />
		</Provider>
	);
	expect(getByText(/code: ok/i)).toBeInTheDocument();
	expect(getByText(/markdown: hello/i)).toBeInTheDocument();
});
