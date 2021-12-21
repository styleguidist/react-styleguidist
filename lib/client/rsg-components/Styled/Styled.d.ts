import { ComponentType } from 'react';
import { Styles, Classes } from 'jss';
import * as Rsg from '../../../typings';
export interface JssInjectedProps {
    classes: Classes;
}
export default function StyleHOC<P extends JssInjectedProps>(styles: (t: Rsg.Theme) => Styles<string>): (WrappedComponent: ComponentType<P>) => ComponentType<Omit<P, keyof JssInjectedProps>>;
