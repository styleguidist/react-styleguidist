import React from 'react';
export declare const baseOverrides: {
    a: {
        component: React.SFC<{}>;
    };
    h1: {
        component: React.SFC<{}>;
        props: {
            level: number;
        };
    };
    h2: {
        component: React.SFC<{}>;
        props: {
            level: number;
        };
    };
    h3: {
        component: React.SFC<{}>;
        props: {
            level: number;
        };
    };
    h4: {
        component: React.SFC<{}>;
        props: {
            level: number;
        };
    };
    h5: {
        component: React.SFC<{}>;
        props: {
            level: number;
        };
    };
    h6: {
        component: React.SFC<{}>;
        props: {
            level: number;
        };
    };
    p: {
        component: React.SFC<{}>;
        props: {
            semantic: string;
        };
    };
    em: {
        component: React.SFC<{}>;
        props: {
            semantic: string;
        };
    };
    strong: {
        component: React.SFC<{}>;
        props: {
            semantic: string;
        };
    };
    ul: {
        component: React.SFC<{}>;
    };
    ol: {
        component: React.SFC<{}>;
        props: {
            ordered: boolean;
        };
    };
    blockquote: {
        component: React.SFC<{}>;
    };
    code: {
        component: React.SFC<{}>;
    };
    pre: {
        component: React.SFC<{}>;
    };
    input: {
        component: React.SFC<{}>;
    };
    hr: {
        component: React.SFC<{}>;
    };
    table: {
        component: React.SFC<{}>;
    };
    thead: {
        component: React.SFC<{}>;
    };
    th: {
        component: React.SFC<{}>;
        props: {
            header: boolean;
        };
    };
    tbody: {
        component: React.SFC<{}>;
    };
    tr: {
        component: React.SFC<{}>;
    };
    td: {
        component: React.SFC<{}>;
    };
    details: {
        component: React.SFC<{}>;
    };
    summary: {
        component: React.SFC<{}>;
    };
};
export declare const inlineOverrides: {
    p: {
        component: React.ComponentType<Pick<import("../Text/TextRenderer").TextProps, string | number>>;
    };
    a: {
        component: React.SFC<{}>;
    };
    h1: {
        component: React.SFC<{}>;
        props: {
            level: number;
        };
    };
    h2: {
        component: React.SFC<{}>;
        props: {
            level: number;
        };
    };
    h3: {
        component: React.SFC<{}>;
        props: {
            level: number;
        };
    };
    h4: {
        component: React.SFC<{}>;
        props: {
            level: number;
        };
    };
    h5: {
        component: React.SFC<{}>;
        props: {
            level: number;
        };
    };
    h6: {
        component: React.SFC<{}>;
        props: {
            level: number;
        };
    };
    em: {
        component: React.SFC<{}>;
        props: {
            semantic: string;
        };
    };
    strong: {
        component: React.SFC<{}>;
        props: {
            semantic: string;
        };
    };
    ul: {
        component: React.SFC<{}>;
    };
    ol: {
        component: React.SFC<{}>;
        props: {
            ordered: boolean;
        };
    };
    blockquote: {
        component: React.SFC<{}>;
    };
    code: {
        component: React.SFC<{}>;
    };
    pre: {
        component: React.SFC<{}>;
    };
    input: {
        component: React.SFC<{}>;
    };
    hr: {
        component: React.SFC<{}>;
    };
    table: {
        component: React.SFC<{}>;
    };
    thead: {
        component: React.SFC<{}>;
    };
    th: {
        component: React.SFC<{}>;
        props: {
            header: boolean;
        };
    };
    tbody: {
        component: React.SFC<{}>;
    };
    tr: {
        component: React.SFC<{}>;
    };
    td: {
        component: React.SFC<{}>;
    };
    details: {
        component: React.SFC<{}>;
    };
    summary: {
        component: React.SFC<{}>;
    };
};
interface MarkdownProps {
    text: string;
    inline?: boolean;
}
export declare const Markdown: React.FunctionComponent<MarkdownProps>;
export default Markdown;
