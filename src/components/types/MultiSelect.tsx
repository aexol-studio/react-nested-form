import * as styles from '../style/MultiSelect';
export type SelectInterface = {
  options: Array<{
    label: string;
    value: any;
  }>;
  style?: Object;
  placeholder?: string;
  styles?: typeof styles;
  blockEmpty?: boolean;
  noSort?: boolean;
  search?: boolean;
  label?: string;
  disabled?: boolean;
};
