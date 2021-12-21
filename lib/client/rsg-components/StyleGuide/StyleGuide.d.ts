import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Rsg from '../../../typings';
export interface StyleGuideProps {
    codeRevision: number;
    cssRevision: string;
    config: Rsg.ProcessedStyleguidistConfig;
    slots: any;
    sections: Rsg.Section[];
    welcomeScreen?: boolean;
    patterns?: string[];
    displayMode?: string;
    allSections?: Rsg.Section[];
    pagePerSection?: boolean;
}
interface StyleGuideState {
    error: Error | boolean;
    info: React.ErrorInfo | null;
}
export default class StyleGuide extends Component<StyleGuideProps, StyleGuideState> {
    static propTypes: {
        codeRevision: PropTypes.Validator<number>;
        cssRevision: PropTypes.Validator<string>;
        config: PropTypes.Validator<object>;
        slots: PropTypes.Validator<object>;
        sections: PropTypes.Validator<any[]>;
        welcomeScreen: PropTypes.Requireable<boolean>;
        patterns: PropTypes.Requireable<any[]>;
        displayMode: PropTypes.Requireable<string>;
        allSections: PropTypes.Validator<any[]>;
        pagePerSection: PropTypes.Requireable<boolean>;
    };
    static defaultProps: {
        displayMode: string;
    };
    state: {
        error: boolean;
        info: null;
    };
    componentDidCatch(error: Error, info: React.ErrorInfo): void;
    render(): JSX.Element;
}
export {};
