import * as React from 'react';
import { Nest as styles } from './style';
import { Form } from '..';
import { FieldDefinition } from '../fields';
export const Nest = ({
  onChange,
  styles: overrideStyles,
  value,
  fields,
  ...props
}: FieldDefinition<'nest'>) => (
    <Form
      className={overrideStyles ? overrideStyles.Nest : styles.Nest}
      fields={fields}
      validate={(e) => {
        onChange(e);
      }}
      values={value}
      submitText="Edit"
    />
);
