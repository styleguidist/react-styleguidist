/* eslint
  react/forbid-prop-types: off,
  react/jsx-filename-extension: off
*/
import React, { PropTypes, PureComponent } from 'react';
import Immutable from 'immutable';

import PropsEditorRenderer from './PropsEditorRenderer';

import { parseProps, generateProps, generateNewCode } from './utils';

export default class PropsEditor extends PureComponent {
  static propTypes = {
    props: PropTypes.object.isRequired,
    componentName: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isFlow: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      oldFields: new Immutable.Map({}),
      fields: new Immutable.Map({}),
      submitPosition: 0,
    };
  }

  componentWillMount() {
    const fields = parseProps(this.props);
    this.setState({
      oldFields: new Immutable.Map(fields),
      fields: new Immutable.Map(fields),
    });
  }

  componentWillReceiveProps(nextProps) {
    const fields = parseProps(nextProps);

    this.setState({
      oldFields: new Immutable.Map(fields),
      fields: new Immutable.Map(fields),
    });
  }

  setFieldValue = (field, value) => {
    const { fields } = this.state;
    this.setState({
      fields: fields.setIn([field, 'value'], value),
    });
  };

  setSubmitPosition = (event) => {
    const { target } = event;
    this.setState({
      submitPosition: target.getClientRects()[0].top - 64,
    });
  };

  handleChangeValueTextfield = ({ name }) => (event) => {
    const { value } = event.target;
    this.setFieldValue(name, value);
    this.setSubmitPosition(event);
  };

  handleChangeValueSelectfield = ({ name }) => (event, index, value) => {
    this.setFieldValue(name, value);
    this.setSubmitPosition(event);
  };

  handleChangeValueCheckBox = ({ name }) => (event, value) => {
    this.setFieldValue(name, value);
    this.setSubmitPosition(event);
  };

  handleToggleProp = ({ name }) => (event) => {
    const { fields } = this.state;
    const field = fields.get(name);
    const newField = field.withMutations((immutableMap) => {
      const value = immutableMap.get('disabled');
      immutableMap.set('disabled', !value)
        .set('value', '');
    });
    this.setState({
      fields: fields.set(name, newField),
    });
    this.setSubmitPosition(event);
  };

  handleSubmit = () => {
    const { code, componentName } = this.props;
    const { fields } = this.state;
    const props = fields.map((field) => generateProps(field.toJS()));
    const simpleProps = props.filter((prop) => prop).toArray();
    const newCode = generateNewCode(code, componentName, simpleProps);
    this.props.onSubmit(newCode);
  };

  render() {
    const { props, isFlow } = this.props;
    const { fields, submitPosition, oldFields } = this.state;
    const submitIsVisible = !fields.equals(oldFields);
    return (
      <PropsEditorRenderer
        props={props}
        fields={fields}
        isFlow={isFlow}
        submitPosition={submitPosition}
        submitIsVisible={submitIsVisible}
        onSubmit={this.handleSubmit}
        onToggle={this.handleToggleProp}
        onTextChange={this.handleChangeValueTextfield}
        onSelect={this.handleChangeValueSelectfield}
        onCheck={this.handleChangeValueCheckBox}
      />
   );
  }
}
