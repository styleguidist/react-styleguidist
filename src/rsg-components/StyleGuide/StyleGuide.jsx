/* eslint
  import/no-extraneous-dependencies: off,
  import/no-unresolved: off,
  import/extensions: off,
  react/forbid-prop-types: off,
*/
import React, { Component, PropTypes } from 'react';
import isEmpty from 'lodash/isEmpty';
import Components from 'rsg-components/Components';
import TableOfContents from 'rsg-components/TableOfContents';
import Message from 'rsg-components/Message';
import { HOMEPAGE, DOCS_CONFIG } from 'rsg-components/../../scripts/consts';
import StyleGuideRenderer from './StyleGuideRenderer';

export default class StyleGuide extends Component {
  static propTypes = {
    config: PropTypes.object.isRequired,
    components: PropTypes.array.isRequired,
    sections: PropTypes.array.isRequired,
    sidebar: PropTypes.bool,
    singleExample: PropTypes.bool,
    targetComponentName: PropTypes.string,
  };
  static defaultProps = {
    sidebar: true,
  };
  static childContextTypes = {
    codeKey: PropTypes.number.isRequired,
    config: PropTypes.object.isRequired,
    singleExample: PropTypes.bool,
    targetComponentName: PropTypes.string,
  };

  getChildContext() {
    return {
      // eslint-disable-next-line react/prop-types
      codeKey: this.props.codeKey,
      config: this.props.config,
      singleExample: this.props.singleExample,
      targetComponentName: this.props.targetComponentName,
    };
  }

  renderComponents = (components, sections, sidebar, singleExample) => {
    if (!isEmpty(components) || !isEmpty(sections)) {
      return (
        <Components
          components={components}
          sections={sections}
          sidebar={sidebar}
          singleExample={singleExample}
        />
      );
    }

    return (
      <Message>
        No components or sections found.
        Check [the `components` and `sections` options]({DOCS_CONFIG}) in your style guide config.
      </Message>
    );
  }

  renderTableOfContents = (components, sections) => (
    <TableOfContents components={components} sections={sections} />
  )

  render() {
    const { config, components, sections,
      sidebar, singleExample, targetComponentName } = this.props;

    return (
      <StyleGuideRenderer
        title={config.title}
        homepageUrl={HOMEPAGE}
        components={this.renderComponents(components, sections, sidebar, singleExample)}
        sections={sections}
        singleExample={singleExample}
        targetComponentName={targetComponentName}
        toc={this.renderTableOfContents(components, sections)}
        sidebar={(isEmpty(components) && isEmpty(sections)) ? false : sidebar}
      />
    );
  }
}
