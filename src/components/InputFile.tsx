import * as React from 'react';
import { FieldDefinition } from '../fields';
export const InputFile = ({
  value,
  styles,
  onChange,
  ...props
}: FieldDefinition<'file'>) => (
  <div className="formgenFile" key={name}>
    <input
      type="file"
      onChange={(e) => {
        onChange(e.target.files[0]);
      }}
    />
    <a className="file_holder" href={value instanceof File ? '' : value}>
      {value instanceof File ? '' : value}
    </a>
  </div>
);
