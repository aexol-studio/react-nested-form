import * as React from 'react';

export type FieldWrapperProps= {
  name:string
}

export class FieldWrapper extends React.Component<FieldWrapperProps> {
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}
