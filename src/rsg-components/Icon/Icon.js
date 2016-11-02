import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

// Imported icons here!
import Close from './svg/close.svg';

// Add each SVG icon to this object
const glyphs = {
    close: <Close />
}

const Icon = ({glyph}) => {
    return (
        <div className="rsg-icon" style={{ lineHeight: '0' }}>
            {glyphs[glyph]}
        </div>
    );
};

export default Icon;
