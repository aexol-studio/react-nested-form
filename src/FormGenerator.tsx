import * as React from 'react';
import * as components from './components';

import { FieldDescription } from './fields';

import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';
import SubmitComponent from './SubmitComponent';

const fieldElements = {
  autosuggest: components.Autosuggest,
  string: components.Input,
  boolean: components.Checkbox,
  number: components.Input,
  integer: components.Input,
  float: components.Input,
  text: components.Textarea,
  select: components.MultiSelect,
  file: components.InputFile,
  datetime: components.Datetime,
  date: components.Date,
  time: components.Time,
  reference: components.MultiSelect,
  array: components.Tag,
  nest: components.Nest,
  nestArray: components.NestArray
};

export type ValuesDescription = {
  [x: string]: any;
};

export interface FormGeneratorInterface {
  fields: Array<FieldDescription>;
  validate: Function;
  style?: Object;
  className?: string;
  values?: {
    [x: string]: any;
  };
  sendFullObject?: boolean;
  isFormData?: boolean;
  AlternativeWrapper?: React.ComponentType<FieldWrapperProps>;
  Submit?: React.ComponentType<any>;
  submitText?: string;
  validateOnChange?: boolean;
}

export class Form extends React.Component<FormGeneratorInterface> {
  state = {
    errors: {},
    fields: {},
    changed: {}
  };
  receiveFields = (values: ValuesDescription) => {
    const { fields } = this.props;
    let updateDict = {};
    let changesDict = { ...this.state.changed };
    for (var { name } of fields) {
      updateDict[name] = values[name];
      changesDict[name] = false;
    }
    this.setState({ fields: updateDict, changed: changesDict });
  };
  componentWillMount() {
    const { values } = this.props;
    if (values) {
      this.receiveFields(values);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { values } = this.props;
    if (nextProps.values && nextProps.values !== values) {
      this.receiveFields(nextProps.values);
    }
  }
  validate = () => {
    const { fields, isFormData = false } = this.props;
    var sfields = {
      ...this.state.fields
    };
    const filteredValidate = this.props.sendFullObject
      ? Object.keys(sfields)
      : Object.keys(sfields).filter((k) => !!this.state.changed[k]);
    let returnData = filteredValidate.reduce((accumulator, currentValue, currentIndex, array) => {
      accumulator[currentValue] = sfields[currentValue];
      return accumulator;
    }, {});
    for (var f of fields) {
      if (returnData[f.name]) {
        returnData[f.name] = returnData[f.name];
      }
    }
    if (isFormData) {
      let fd = new FormData();
      for (var key of Object.keys(returnData)) {
        let value = returnData[key];
        fd.append(
          key,
          Array.isArray(value) || typeof value === 'object' ? JSON.stringify(value) : value
        );
      }
    }
    this.props.validate(returnData);
  };
  modifyField = ({ name, value }) =>
    new Promise((resolve, reject) => {
      this.setState(
        {
          fields: {
            ...this.state.fields,
            [name]: value
          },
          changed: {
            ...this.state.changed,
            [name]: true
          }
        },
        resolve
      );
    });
  render() {
    const {
      fields,
      submitText,
      AlternativeWrapper = FieldWrapper,
      style = {},
      className = 'FormGen',
      validateOnChange
    } = this.props;
    const { Submit = SubmitComponent } = this.props;
    if (new Set([...fields.map((f) => f.name)]).size !== fields.length) {
      throw new Error('Name properties of form fields must be unique!');
    }
    const fieldsRender = fields.map((f, i) => {
      let ftype = f.fieldType;
      const RenderField = fieldElements[ftype] as React.ComponentType<any>;
      return (
        <AlternativeWrapper field={f} key={i}>
          <RenderField
            name={f.name}
            onChange={(e) => {
              this.modifyField({
                name: f.name,
                value: e
              }).then(() => {
                if (validateOnChange) {
                  this.validate();
                }
              });
            }}
            value={this.state.fields[f.name]}
            {...f.content}
          />
        </AlternativeWrapper>
      );
    });
    return (
      <div className={className} style={style}>
        {fieldsRender}
        {!validateOnChange && (
          <Submit
            submitText={submitText}
            onClick={() => {
              this.validate();
            }}
          />
        )}
      </div>
    );
  }
}
