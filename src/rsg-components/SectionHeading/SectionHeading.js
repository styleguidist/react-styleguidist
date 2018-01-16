import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slot from 'rsg-components/Slot';
import SectionHeadingRenderer from 'rsg-components/SectionHeading/SectionHeadingRenderer';
import getUrl from '../../utils/getUrl';

/**
 * Section heading
 * Handle display of h1, h2, h3 ... elements
 */
export default class SectionHeading extends Component {

  static propTypes = {
    children: PropTypes.node,
    id: PropTypes.string.isRequired,
    slotName: PropTypes.string.isRequired,
    slotProps: PropTypes.object.isRequired,
    depth: PropTypes.number.isRequired,
    deprecated: PropTypes.bool,
    /** additional type of the heading **/
    type: PropTypes.string,
  };

  render() {
    // get url href
    const href = getUrl({ slug: this.props.id, anchor: true });

    return (
      <SectionHeadingRenderer
        toolbar={<Slot name={this.props.slotName} props={this.props.slotProps} />}
        id={this.props.id}
        type={this.props.type}
        href={href}
        {...this.props}
      >
        {this.props.children}
      </SectionHeadingRenderer>
    );
  }
}
