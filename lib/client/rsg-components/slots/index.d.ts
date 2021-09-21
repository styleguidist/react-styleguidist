/// <reference types="react" />
/// <reference types="lib/typings/dependencies/react-docgen" />
import * as Rsg from '../../../typings';
export declare const EXAMPLE_TAB_CODE_EDITOR = "rsg-code-editor";
export declare const DOCS_TAB_USAGE = "rsg-usage";
declare const _default: (config?: Rsg.ProcessedStyleguidistConfig | undefined) => {
    sectionToolbar: {
        ({ name, example, isolated, href }: import("./IsolateButton").IsolateButtonProps): JSX.Element | null;
        propTypes: {
            name: import("prop-types").Validator<string>;
            example: import("prop-types").Requireable<number>;
            isolated: import("prop-types").Requireable<boolean>;
        };
    }[];
    componentToolbar: {
        ({ name, example, isolated, href }: import("./IsolateButton").IsolateButtonProps): JSX.Element | null;
        propTypes: {
            name: import("prop-types").Validator<string>;
            example: import("prop-types").Requireable<number>;
            isolated: import("prop-types").Requireable<boolean>;
        };
    }[];
    exampleToolbar: {
        ({ name, example, isolated, href }: import("./IsolateButton").IsolateButtonProps): JSX.Element | null;
        propTypes: {
            name: import("prop-types").Validator<string>;
            example: import("prop-types").Requireable<number>;
            isolated: import("prop-types").Requireable<boolean>;
        };
    }[];
    exampleTabButtons: {
        id: string;
        render: {
            (props: any): JSX.Element;
            propTypes: {
                onClick: import("prop-types").Validator<(...args: any[]) => any>;
                name: import("prop-types").Validator<string>;
                active: import("prop-types").Requireable<boolean>;
            };
        };
    }[];
    exampleTabs: {
        id: string;
        render: import("react").ComponentType<Pick<import("../Editor/Editor").EditorProps, "code" | "onChange">>;
    }[];
    docsTabButtons: {
        id: string;
        render: {
            (props: import("./UsageTabButton").UsageTabButtonProps): JSX.Element | null;
            propTypes: {
                onClick: import("prop-types").Validator<(...args: any[]) => any>;
                name: import("prop-types").Validator<string>;
                props: import("prop-types").Validator<import("prop-types").InferProps<{
                    props: import("prop-types").Requireable<any[]>;
                    methods: import("prop-types").Requireable<any[]>;
                }>>;
                active: import("prop-types").Requireable<boolean>;
            };
        };
    }[];
    docsTabs: {
        id: string;
        render: import("react").FunctionComponent<{
            props: {
                methods?: import("react-docgen").MethodDescriptor[] | undefined;
                props?: import("../Props/util").PropDescriptor[] | undefined;
            };
        }>;
    }[];
};
export default _default;
