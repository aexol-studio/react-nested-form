import * as React from 'react';

export type InputInterface = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  styles?: {
    Input: string;
    [x: string]: string;
  };
};

