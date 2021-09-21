import React from 'react';
import * as Rsg from '../../../typings';
export interface ExamplesRenderer {
    examples: Rsg.Example[];
    name?: string;
    exampleMode?: string;
}
declare const Examples: React.FunctionComponent<ExamplesRenderer>;
export default Examples;
