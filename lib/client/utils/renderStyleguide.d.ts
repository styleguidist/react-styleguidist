import React from 'react';
import * as Rsg from '../../typings';
interface StyleguideObject {
    sections: Rsg.Section[];
    config: Rsg.ProcessedStyleguidistConfig;
    patterns: string[];
    welcomeScreen?: boolean;
}
/**
 * @param {object} styleguide An object returned by styleguide-loader
 * @param {number} codeRevision
 * @param {Location} [loc]
 * @param {Document} [doc]
 * @param {History} [hist]
 * @return {React.ReactElement}
 */
export default function renderStyleguide(styleguide: StyleguideObject, codeRevision: number, loc?: {
    hash: string;
    pathname: string;
    search: string;
}, doc?: {
    title: string;
}, hist?: {
    replaceState: (name: string, title: string, url: string) => void;
}): React.ReactElement;
export {};
