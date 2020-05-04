import React, { useState, useEffect } from 'react';
import * as components from './components';

import { FieldDescription } from './fields';

import { FieldWrapper, FieldWrapperProps } from './FieldWrapper';
import { SubmitComponent } from './SubmitComponent';

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
  nestArray: components.NestArray,
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

export type FormState = {
  errors: {
    [x: string]: string;
  };
  fields: {
    [x: string]: any;
  };
  changed: {
    [x: string]: boolean;
  };
};

export const Form: React.FC<FormGeneratorInterface> = ({
  fields,
  submitText = 'Submit',
  AlternativeWrapper = FieldWrapper,
  style = {},
  className,
  validateOnChange,
  isFormData = false,
  Submit = SubmitComponent,
  values,
  sendFullObject,
  validate,
}) => {
  const [state, setState] = useState<FormState>({
    errors: {},
    changed: {},
    fields: {},
  });

  useEffect(() => {
    if (values) {
      receiveFields(values);
    }
  }, [JSON.stringify(values)]);

  const receiveFields = (values: ValuesDescription) => {
    let updateDict: Record<string, any> = {};
    let changesDict = { ...state.changed };
    for (var { name } of fields) {
      updateDict[name] = values[name];
      changesDict[name] = false;
    }
    setState({ ...state, fields: updateDict, changed: changesDict });
  };
  const modifyField = ({ name, value }: { name: string; value: any }) =>
    setState({
      ...state,
      fields: {
        ...state.fields,
        [name]: value,
      },
      changed: {
        ...state.changed,
        [name]: true,
      },
    });
  const validateFunction = () => {
    let sfields = {
      ...state.fields,
    };
    if (!sendFullObject) {
      const filteredValidate = Object.keys(sfields).filter((k) => !!state.changed[k]);
      sfields = filteredValidate.reduce((a, b) => {
        a[b] = sfields[b];
        return a;
      }, {} as Record<string, any>);
    }
    if (isFormData) {
      let fd = new FormData();
      for (var key of Object.keys(sfields)) {
        let value = sfields[key];
        fd.append(
          key,
          Array.isArray(value) || typeof value === 'object' ? JSON.stringify(value) : value
        );
      }
    }
    let pass = true;
    let errors = {};
    for (var f of fields) {
      if (f.validate) {
        try {
          f.validate(sfields[f.name]);
        } catch (error) {
          console.log(error);
          errors = {
            ...errors,
            [f.name]: error.toString(),
          };
          pass = false;
        }
      }
      if (f.required && !sfields[f.name]) {
        errors = {
          ...errors,
          [f.name]: `Field ${f.name} is required`,
        };
        pass = false;
      }
    }
    setState((state) => ({
      ...state,
      errors,
    }));
    if (pass) {
      validate(sfields);
    }
  };
  if (new Set([...fields.map((f) => f.name)]).size !== fields.length) {
    throw new Error('Name properties of form fields must be unique!');
  }
  const fieldsRender = fields.map((f, i) => {
    let ftype = f.fieldType;
    const RenderField = fieldElements[ftype] as React.ComponentType<any>;
    return (
      <AlternativeWrapper field={f} key={i} error={state.errors[f.name]}>
        <RenderField
          name={f.name}
          onChange={(e: any) => {
            modifyField({
              name: f.name,
              value: e,
            });
            if (validateOnChange) {
              validateFunction();
            }
          }}
          value={state.fields[f.name]}
          {...f.content}
        />
      </AlternativeWrapper>
    );
  });
  return (
    <div
      className={className}
      style={style}
      onKeyDown={(e) => {
        if (!validateOnChange && (e.key === 'Enter' || e.keyCode === 13)) {
          validateFunction();
        }
      }}
    >
      {fieldsRender}
      {!validateOnChange && (
        <Submit
          submitText={submitText}
          onClick={() => {
            validateFunction();
          }}
        />
      )}
    </div>
  );
};
