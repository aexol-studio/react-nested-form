import * as React from 'react';
import { FieldDescription } from './fields';

export type FieldWrapperProps = {
  field: FieldDescription;
  error?: string;
};

export class FieldWrapper extends React.Component<FieldWrapperProps> {
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}
