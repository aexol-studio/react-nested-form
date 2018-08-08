import * as React from 'react';
import { Textarea as styles } from './style';
import { FieldDefinition } from '../fields';

export const Textarea = ({
  styles: overrideStyles,
  onChange,
  value = '',
  ...props
}: FieldDefinition<'text'>) => (
  <textarea
    className={overrideStyles ? overrideStyles.Textarea : styles.Textarea}
    onChange={(e) => {
      onChange(e.target.value);
    }}
    value={value}
    {...props}
  />
);
