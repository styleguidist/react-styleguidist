import React, { ReactNode, Fragment } from 'react';
import ThemeProvider from './ThemeProvider';
import GlobalStyle from './styles';

interface Props {
    children?: ReactNode
}

const StyleGuideWrapper = function({ children }: Props) {
    return (
        <ThemeProvider>
            <Fragment>
                <GlobalStyle />
                {children}
            </Fragment>
        </ThemeProvider>
    )
};

export default StyleGuideWrapper;
