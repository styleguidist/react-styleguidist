/* eslint
  import/no-extraneous-dependencies: off,
  import/no-unresolved: off,
  import/extensions: off,
  react/forbid-prop-types: off,
  react/jsx-filename-extension: off
*/
import React, { PureComponent, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import SyncIcon from 'material-ui/svg-icons/notification/sync';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Scrollbars } from 'react-custom-scrollbars';
import Responsive from 'react-responsive-decorator';

import cn from 'classnames';
import map from 'lodash/map';

import { unquote, getType, showSpaces } from '../Props/util';
import { parseDefault, getTypeForLabel } from './utils';
import s from './PropsEditor.css';

@Responsive
class PropsEditorRenderer extends PureComponent {
  static propTypes = {
    props: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    submitPosition: PropTypes.number,
    submitIsVisible: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onCheck: PropTypes.func.isRequired,
    onToggle: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    media: PropTypes.func,
    isFlow: PropTypes.bool,
  };

  static defaultProps = {
    submitPosition: 0,
    submitIsVisible: false,
  };

  componentWillMount() {
    const { media } = this.props;
    media({ minWidth: 767 }, () => {
      this.setState({
        isMobile: true,
      });
    });

    media({ maxWidth: 768 }, () => {
      this.setState({
        isMobile: false,
      });
    });
  }

  renderTextField({ name, value, disabled, label, description, hintStyle }) {
    const stringValue = value.toString();
    return (
      <TextField
        key={name}
        value={stringValue}
        disabled={disabled}
        floatingLabelText={label}
        hintText={description}
        hintStyle={hintStyle}
        multiLine
        fullWidth
        onChange={this.props.onTextChange({ name })}
      />
    );
  }

  renderSelectField(value, { name, variable, disabled, label, description, hintStyle }) {
    const items = value.map((item, key) => {
      const val = showSpaces(unquote(item.value));
      return <MenuItem key={key} value={val} primaryText={val} />;
    });
    return (
      <SelectField
        value={variable}
        disabled={disabled}
        floatingLabelText={label}
        hintText={description}
        hintStyle={hintStyle}
        fullWidth
        onChange={this.props.onSelect({ name })}
      >
        {items}
      </SelectField>
    );
  }

  renderCheckbox({ name, value, label, disabled }) {
    const boolValue = !!value;
    return (
      <div className={s.customCheck}>
        <Checkbox
          defaultChecked={boolValue}
          label={label}
          labelPosition="left"
          onCheck={this.props.onCheck({ name })}
          disabled={disabled}
          style={{ width: 'auto' }}
          labelStyle={{ width: 'auto' }}
        />
      </div>
    );
  }

  renderCallback({ name, disabled, value, label }) {
    const style = {
      display: 'flex',
      float: 'left',
      marginRight: '1rem',
      marginBottom: '1rem',
      width: 'auto',
    };
    return (
      <div>
        <label
          htmlFor={name}
          style={{
            verticalAlign: 'top',
            marginRight: '1rem',
            display: 'inline-block',
            width: '200px',
            fontSize: 14,
            lineHeight: '24px',
            marginBottom: '0.75rem',
            marginTop: '0.75rem',
            color: disabled ? 'rgba(0, 0, 0, 0.298039)' : 'rgba(0, 0, 0, 0.870588)',
          }}
        >
          {label}
        </label>
        <RadioButtonGroup
          name={name}
          onChange={this.props.onCheck({ name })}
          defaultSelected={value}
          style={{ display: 'inline-block' }}
        >
          <RadioButton
            value="(...atr) => {console.log(atr)}"
            label="console"
            disabled={disabled}
            style={style}
          />
          <RadioButton
            value="(...atr) => {alert(atr)}"
            disabled={disabled}
            label="alert"
            style={style}
          />
        </RadioButtonGroup>
      </div>
    );
  }

  renderField = ({ type, value, description, defaultValue, required, name, isFlow }) => {
    if (!type) {
      return null;
    }
    const { fields } = this.props;
    const defaultVariable = defaultValue ? parseDefault(defaultValue) : '';
    const disabled = required ? false : fields.getIn([name, 'disabled']);
    const variable = disabled ? defaultVariable : fields.getIn([name, 'value']);
    const label = `${required ? '*' : ''}${name} :${getTypeForLabel(type)}`;
    const hintStyle = { fontSize: 12 };

    let component;
    switch (type.name) {
      case 'boolean':
      case 'bool': {
        component = this.renderCheckbox({
          name,
          value: variable,
          disabled,
          label,
        });
        break;
      }
      case 'enum': {
        component = this.renderSelectField(
          value,
          {
            name,
            variable,
            disabled,
            label,
            description,
            hintStyle,
          },
        );
        break;
      }
      case 'union': {
        if (isFlow) {
          if (value[0].value) {
            component = this.renderSelectField(
              value,
              {
                name,
                variable,
                disabled,
                label,
                description,
                hintStyle,
              },
            );
            break;
          }
        }
        break;
      }
      case 'signature': {
        if (type.type === 'function') {
          component = this.renderCallback({
            name,
            disabled,
            label,
            value: variable,
          });
          break;
        }
        break;
      }
      case 'func': {
        component = this.renderCallback({
          name,
          disabled,
          label,
          value: variable,
        });
        break;
      }
      case 'string':
      case 'number': {
        component = this.renderTextField({
          name,
          value: variable,
          disabled,
          label,
          description,
          hintStyle,
        });
        break;
      }
      case 'arrayOf': {
        switch (type.value.name) {
          case 'string':
          case 'number': {
            component = this.renderTextField({
              name,
              value: variable,
              disabled,
              label,
              description,
              hintStyle,
            });
            break;
          }
          default:
            break;
        }
        break;
      }
      case 'Array': {
        switch (type.elements[0].name) {
          case 'string':
          case 'number': {
            component = this.renderTextField({
              name,
              value: variable,
              disabled,
              label,
              description,
              hintStyle,
            });
            break;
          }
          default:
            break;
        }
        break;
      }
      default: break;
    }

    if (!component) {
      return null;
    }

    return (
      <div className={s.item} key={name}>
        <div className={s.field}>
          {component}
        </div>
        <div className={s.fieldToggle}>
          <Toggle
            defaultToggled={!disabled}
            disabled={required}
            onToggle={this.props.onToggle({ name })}
          />
        </div>
      </div>
    );
  };

  render() {
    const { props, onSubmit, submitPosition, submitIsVisible, isFlow } = this.props;
    const fields = map(props, (item, key) =>
      this.renderField({
        type: getType(item),
        value: isFlow ? item.flowType.elements : item.type.value,
        description: item.description,
        defaultValue: item.defaultValue,
        required: item.required,
        name: key,
        isFlow,
      })
    );

    const content = (
      <span>
        <Subheader>Change component props how you like</Subheader>
        <div className={s.items}>
          {fields}
        </div>
        <div className={cn(s.item, s.item_last)}>
          <RaisedButton label="Submit new props" primary onClick={onSubmit} />
        </div>
      </span>
    );

    return (
      <div className={s.root}>
        <div className={s.fields}>
          {this.state.isMobile &&
            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              autoHideDuration={200}
            >
              {content}
            </Scrollbars>
          }
          {!this.state.isMobile && content}
        </div>
        <div
          className={cn(s.fluidPlate, {
            [s.fluidPlate_visible]: submitIsVisible,
          })}
          style={{
            top: submitPosition,
          }}
        >
          <RaisedButton
            icon={<SyncIcon />}
            primary
            onClick={onSubmit}
          />
        </div>
      </div>
    );
  }
}


export default PropsEditorRenderer;
