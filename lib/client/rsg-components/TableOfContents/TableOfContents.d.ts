import { Component } from 'react';
import PropTypes from 'prop-types';
import * as Rsg from '../../../typings';
interface TableOfContentsProps {
    sections: Rsg.Section[];
    useRouterLinks?: boolean;
    tocMode?: string;
    loc: {
        hash: string;
        pathname: string;
    };
}
export default class TableOfContents extends Component<TableOfContentsProps> {
    static propTypes: {
        sections: PropTypes.Validator<any[]>;
        useRouterLinks: PropTypes.Requireable<boolean>;
        tocMode: PropTypes.Requireable<string>;
        loc: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        loc: Location;
    };
    state: {
        searchTerm: string;
    };
    private renderLevel;
    private renderSections;
    render(): JSX.Element;
}
export {};
