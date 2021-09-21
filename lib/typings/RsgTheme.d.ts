/**
 * When the theme is to be used in a component,
 * it will have all it's values set.
 * None of those declarations should be optional
 */
export interface Theme {
    spaceFactor: number;
    space: number[];
    color: {
        base: string;
        light: string;
        lightest: string;
        link: string;
        linkHover: string;
        focus: string;
        border: string;
        name: string;
        type: string;
        error: string;
        baseBackground: string;
        codeBackground: string;
        sidebarBackground: string;
        ribbonBackground: string;
        ribbonText: string;
        codeBase: string;
        codeComment: string;
        codePunctuation: string;
        codeProperty: string;
        codeDeleted: string;
        codeString: string;
        codeInserted: string;
        codeOperator: string;
        codeKeyword: string;
        codeFunction: string;
        codeVariable: string;
    };
    fontFamily: {
        base: string[];
        monospace: string[];
    };
    fontSize: {
        base: number;
        text: number;
        small: number;
        h1: number;
        h2: number;
        h3: number;
        h4: number;
        h5: number;
        h6: number;
    };
    mq: {
        small: string;
    };
    borderRadius: number;
    maxWidth: number;
    sidebarWidth: number;
    buttonTextTransform: string;
}
