import React from 'react';
import { MethodDescriptor } from 'react-docgen';
export declare const columns: {
    caption: string;
    render: ({ name, tags }: MethodDescriptor) => JSX.Element;
}[];
declare const MethodsRenderer: React.FunctionComponent<{
    methods: MethodDescriptor[];
}>;
export default MethodsRenderer;
