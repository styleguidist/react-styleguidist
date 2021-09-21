/// <reference types="react" />
import PropTypes from 'prop-types';
import { TagProps } from 'react-docgen';
export declare function getMarkdown(props: TagProps): string;
declare function JsDoc(props: TagProps): JSX.Element | null;
declare namespace JsDoc {
    var propTypes: {
        deprecated: PropTypes.Requireable<any[]>;
        see: PropTypes.Requireable<any[]>;
        link: PropTypes.Requireable<any[]>;
        author: PropTypes.Requireable<any[]>;
        version: PropTypes.Requireable<any[]>;
        since: PropTypes.Requireable<any[]>;
    };
}
export default JsDoc;
