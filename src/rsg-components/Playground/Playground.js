/* eslint
  import/no-extraneous-dependencies: off,
  import/no-unresolved: off,
  import/extensions: off,
  react/forbid-prop-types: off,
  react/jsx-filename-extension: off
*/
import Immutable from 'immutable';
import React, { Component, PropTypes } from 'react';
import debounce from 'lodash/debounce';
import PlaygroundRenderer from 'rsg-components/Playground/PlaygroundRenderer';
import { getQueryVariable } from '../utils/settingsLink';
import { generateNewCode, generateProps, parseProps } from '../PropsEditor/utils';

export default class Playground extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    props: PropTypes.object.isRequired,
    evalInContext: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isFlow: PropTypes.bool,
  };

  static contextTypes = {
    config: PropTypes.object.isRequired,
    singleExample: PropTypes.bool,
    targetComponentName: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
    const { code } = props;
    const propsFromLink = getQueryVariable('props');
    let resultCode;
    let propsSettings;
    if (propsFromLink) {
      propsSettings = JSON.parse(propsFromLink);
      resultCode = generateNewCode(
        code,
        context.targetComponentName,
        propsSettings);
    } else {
      resultCode = code;
    }
    this.state = {
      code: resultCode,
      urlProps: propsSettings || null,
    };
  }


  componentWillReceiveProps(nextProps) {
    const { code } = nextProps;
    this.setState({
      code,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.code !== this.state.code
   );
  }

  componentWillUnmount() {
    // clear pending changes before unmount
    if (this.queuedChange) {
      this.queuedChange.cancel();
    }
  }

  handleChange(code) {
    // clear pending changes before proceed
    if (this.queuedChange) {
      this.queuedChange.cancel();
    }
    // stored update action
    //
    const fields = new Immutable.Map(parseProps(
      {
        code,
        props: this.props.props,
        componentName: this.context.targetComponentName,
      })
     );
    const queuedChange = () => this.setState({
      code,
      urlProps: fields.map(
        (field) => generateProps(field.toJS())
      ).filter((prop) => prop).toArray(),
    });

    const { previewDelay } = this.context.config;

    if (previewDelay) {
      // if previewDelay is enabled debounce the code
      this.queuedChange = debounce(queuedChange, previewDelay);
      this.queuedChange();
    }
    else {
      // otherwise execute it
      queuedChange();
    }
  }

  render() {
    const { code, urlProps } = this.state;
    const { evalInContext, index, name, props, isFlow } = this.props;
    const { singleExample } = this.context;

    return (
      <PlaygroundRenderer
        code={code}
        urlProps={urlProps}
        index={index}
        name={name}
        props={props}
        singleExample={singleExample}
        evalInContext={evalInContext}
        isFlow={isFlow}
        onChange={
          (newCode, newProps, settings) => {
            this.handleChange(newCode, newProps, settings);
          }
        }
      />
   );
  }
}
