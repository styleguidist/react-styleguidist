import React from 'react';

interface HeadingProps {
    /** A value to render */
    value: string,
    /** Size of the heading */
    size?: 'sm' | 'md' | 'lg'
}

const Heading = ({ value, size = 'md' }: HeadingProps) => {
    return (
        <h1>Heading for {value} of {size}</h1>
    );
}

export default Heading
