import * as React from 'react';
import { Nest as styles } from './style';
import { Form } from '..';
import { FieldDefinition } from '../fields';
export const Nest = ({
  onChange,
  styles: overrideStyles,
  value,
  fields,
}: FieldDefinition<'nest'>) => (
  <Form
    className={overrideStyles ? overrideStyles.Nest : styles.Nest}
    fields={fields}
    validate={(e: any) => {
      onChange(e);
    }}
    validateOnChange={true}
    values={value}
    sendFullObject={true}
    submitText="Edit"
  />
);
