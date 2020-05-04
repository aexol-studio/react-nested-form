import React from 'react';
import { FieldDescription } from './fields';

export type FieldWrapperProps = {
  field: FieldDescription;
  error?: string;
};

export const FieldWrapper: React.FC<FieldWrapperProps> = ({ children }) => <div>{children}</div>;
