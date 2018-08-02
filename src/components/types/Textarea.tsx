import * as React from 'react';
import * as styles from '../style/Textarea'
export type TextareaInterface = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  styles?: typeof styles
};