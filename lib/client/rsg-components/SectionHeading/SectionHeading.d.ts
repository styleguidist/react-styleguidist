import React from 'react';
interface SectionHeadingProps {
    children?: React.ReactNode;
    id: string;
    slotName: string;
    slotProps: Record<string, unknown>;
    depth: number;
    href?: string;
    deprecated?: boolean;
    pagePerSection?: boolean;
}
declare const SectionHeading: React.FunctionComponent<SectionHeadingProps>;
export default SectionHeading;
