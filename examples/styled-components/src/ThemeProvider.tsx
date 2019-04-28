import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import theme, { inverted } from './theme';

interface Props {
    children: any
}

export default ({ children }: Props) => (
	<ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export const Inverted = ({ children }: Props) => (
	<ThemeProvider theme={inverted}>{children}</ThemeProvider>
);
