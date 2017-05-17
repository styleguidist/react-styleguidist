import React, { PropTypes } from 'react';
import cn from 'classnames';

import s from './StatelessSample.pcss';

/**
 * It's just stateless components example.
 * He show how stateless components must be designed.
 * @type {ReactStatelessComponent}
 * @name StatelessSample
 * @namespace components/__examples__
 * @version 0.0.1
 */
function StatelessSample(props) {
  const { array, string, required, bool,
    integer, list, node, onCallback } = props;
  const rootClass = cn(s.root, s[`root_${list}`]);
  return (
    <div className={rootClass} onClick={onCallback}>
      {required}
      {props.children}
      {props.stringOrNumber}
      <br />
      {string}
      {string && integer && ', '}
      {integer}
      {array &&
        <div>
          {array.map((value, key) => <span key={key}>{value}, </span>)}
        </div>
      }
      {bool ? 'True' : 'False'}
      {node && node}
    </div>
  );
}

StatelessSample.propTypes = {
  /**
   * String array props
   */
  array: PropTypes.arrayOf(PropTypes.string),
  /**
   * Boolean props
   */
  bool: PropTypes.bool,
  /**
   * String props
   */
  string: PropTypes.string,
  /**
   * OneOfType props
   */
  stringOrNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
   /**
    * Required props
    */
  required: PropTypes.string.isRequired,
  /**
   * Union props
   */
  list: PropTypes.oneOf(['big', 'medium', 'small']),
  /**
   * Number props
   */
  integer: PropTypes.number,
  /**
   * Node/children props
   */
  node: PropTypes.node,
  /**
   * Children
   */
  children: PropTypes.node,
  /**
   * Callback
   */
  onCallback: PropTypes.func,
};

StatelessSample.defaultProps = {
  array: ['string'],
  bool: false,
  list: 'medium',
  integer: 5,
  stringOrNumber: 10,
  onCallback: () => {},
};

export default StatelessSample;
