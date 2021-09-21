import * as Rsg from '../../typings';
declare const prismTheme: ({ color }: Pick<Rsg.Theme, "color">) => {
    '&': {
        color: string;
    };
    "& .token.comment,\n& .token.prolog,\n& .token.doctype,\n& .token.cdata": {
        isolate: boolean;
        color: string;
    };
    "& .token.punctuation": {
        isolate: boolean;
        color: string;
    };
    "& .namespace": {
        isolate: boolean;
        opacity: number;
    };
    "& .token.property,\n& .token.tag,\n& .token.boolean,\n& .token.number,\n& .token.constant,\n& .token.symbol": {
        isolate: boolean;
        color: string;
    };
    "& .token.deleted": {
        isolate: boolean;
        color: string;
    };
    "& .token.selector,\n& .token.attr-name,\n& .token.string,\n& .token.char,\n& .token.builtin": {
        isolate: boolean;
        color: string;
    };
    "& .token.inserted": {
        isolate: boolean;
        color: string;
    };
    "& .token.operator,\n& .token.entity,\n& .token.url,\n& .language-css .token.string,\n& .style .token.string": {
        isolate: boolean;
        color: string;
    };
    "& .token.atrule,\n& .token.attr-value,\n& .token.keyword": {
        isolate: boolean;
        color: string;
    };
    "& .token.function,\n& .token.class-name": {
        isolate: boolean;
        color: string;
    };
    "& .token.regex,\n& .token.important,\n& .token.variable": {
        isolate: boolean;
        color: string;
    };
    "& .token.important,\n& .token.bold": {
        isolate: boolean;
        fontWeight: string;
    };
    "& .token.italic": {
        isolate: boolean;
        fontStyle: string;
    };
    "& .token.entity": {
        isolate: boolean;
        cursor: string;
    };
};
export default prismTheme;
