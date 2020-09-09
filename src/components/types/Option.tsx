import * as styles from '../style/Option';
export type OptionInterface = {
  options: Array<{
    label: string;
    value: any;
  }>;
  prefferedOptions?: Array<{
    label: string;
    value: any;
  }>;
  showMoreText?: string;
  style?: Object;
  styles?: typeof styles;
};
