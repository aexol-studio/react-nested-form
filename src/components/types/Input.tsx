import * as React from 'react';
import * as styles from '../style/Input';

export type InputInterface = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  styles?: typeof styles;
};
