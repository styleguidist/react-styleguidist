import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Heading from 'rsg-components/Heading';

import './index.scss';

export default class SectionHeadingRenderer extends Component {

  static propTypes = {
    children: PropTypes.node,
    toolbar: PropTypes.node,
    id: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    depth: PropTypes.number.isRequired,
    deprecated: PropTypes.bool,
    type: PropTypes.string,
  };

  render() {
    const headingLevel = Math.min(6, this.props.depth);
    return (
      <div className={cx({
        'section-heading__wrapper': true,
        'section-heading--deprecated': this.props.deprecated,
      })}>
        <Heading level={headingLevel} id={this.props.id} type={this.props.type} section>
          <a href={this.props.href} className="section-heading__sectionName">
            {this.props.children}
          </a>
        </Heading>
        <div className="section-heading__toolbar">{this.props.toolbar}</div>
      </div>
    );
  }
}
