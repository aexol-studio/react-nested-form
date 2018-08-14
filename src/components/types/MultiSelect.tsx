import * as styles from '../style/MultiSelect';
export type SelectInterface = {
  options: Array<{
    label: string;
    value: any;
  }>;
  style?: Object;
  placeholder?: string;
  styles?: typeof styles;
  blockEmpty?: boolean
};
export type SingleSelectInterface = SelectInterface & {
  multi?: false;
};
export type MultiSelectInterface = SelectInterface & {
  multi: true;
};
