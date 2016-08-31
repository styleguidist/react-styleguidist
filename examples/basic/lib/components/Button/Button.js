import React, { Component, PropTypes } from 'react';

import s from './Button.css';

const ButtonSizes = {
	small: '10px',
	normal: '14px',
	large: '18px'
};

/**
 * The only true button.
 */
const Button = React.createClass({
  propTypes: {
	  /**
	   * Button label.
	   */
	  children: PropTypes.string.isRequired,
	  color: PropTypes.string,
	  size: PropTypes.oneOf(['small', 'normal', 'large']),
  },

  getDefaultProps() {
    return {
	    color: '#333',
	    size: 'normal'
    };
  },

  /**
   * Documentation of method
   */
  onClick() {
  },

  render() {
    const {
      color,
      size,
      children
    } = this.props;

    let styles = {
      color: color,
      fontSize: Button.sizes[size]
    };

    return (
      <button onClick={this.onClick} className={s.root} style={styles}>{children}</button>
    );
  },
});

export default Button;
