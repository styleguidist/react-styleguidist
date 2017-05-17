// @flow
import type { Children, Element } from 'react';
import React from 'react';
import classNameBind from 'classnames/bind';
import up from '../../utils/upperFirst';
import s from './StatelessFlowSample.pcss';

type Props = {
  /**
   * String array props
   */
  array?: Array<string>,
  /**
   * Boolean props
   */
  bool?: boolean,
  /**
   * String props
   */
  string?: string,
  /**
   * OneOfType props
   */
  stringOrNumber?: string | number,
  /**
   * Required string props
   */
  required: string,
  /**
   * Union props
   */
  list?: 'big' | 'medium' | 'small',
  /**
   * Number props
   */
  integer?: number,
  /**
   * Node/children props
   */
  node?: Element<any>,
  /**
   * Children
   */
  children?: Children,
  /**
   * Callback
   */
  onCallback?: (
    /**
     * String
     */
    string: string,
    anotherString: string
  ) => void,
};

const cn = classNameBind.bind(s);
/**
 * It's just stateless components example with flow.
 * He show how stateless components with flow must be designed.
 * @type {ReactStatelessComponent}
 * @name StatelessFlowSample
 * @namespace components
 * @version 0.0.1
 */
function StatelessFlowSample({
  array = ['string'],
  string,
  required,
  bool = false,
  list = 'medium',
  integer = 5,
  stringOrNumber,
  children,
  node,
  onCallback = () => {},
}: Props): Element<any> {
  const rootClass = cn({
    root: true,
    [`root_${up(list)}`]: true,
  });

  return (
    <div className={rootClass} onClick={onCallback}>
      {required}
      {children}
      {stringOrNumber}
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

export default StatelessFlowSample;
