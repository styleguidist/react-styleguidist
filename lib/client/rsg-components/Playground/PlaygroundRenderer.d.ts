import React from 'react';
import { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';
export declare const styles: ({ space, color, borderRadius }: Rsg.Theme) => {
    root: {
        marginBottom: number;
    };
    preview: {
        padding: number;
        border: (string | number)[][];
        borderRadius: number;
        width: string;
        display: string;
    };
    controls: {
        display: string;
        alignItems: string;
        marginBottom: number;
    };
    toolbar: {
        marginLeft: string;
    };
    tab: {};
    padded: {
        '& > *': {
            isolate: boolean;
            marginLeft: number;
            marginRight: number;
            '& > *': {
                isolate: boolean;
                marginRight: number;
                marginLeft: number;
            };
        };
    };
};
interface PlaygroundRendererProps extends JssInjectedProps {
    exampleIndex: number;
    name?: string;
    padded: boolean;
    preview: React.ReactNode;
    previewProps: any;
    tabButtons: React.ReactNode;
    tabBody: React.ReactNode;
    toolbar: React.ReactNode;
}
export declare const PlaygroundRenderer: React.FunctionComponent<PlaygroundRendererProps>;
declare const _default: React.ComponentType<Pick<PlaygroundRendererProps, "toolbar" | "name" | "exampleIndex" | "padded" | "preview" | "previewProps" | "tabButtons" | "tabBody">>;
export default _default;
