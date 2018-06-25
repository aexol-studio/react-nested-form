import * as React from 'react';

export type TextareaInterface = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  styles?: {
    Textarea: string;
    [x: string]: any;
  };
};