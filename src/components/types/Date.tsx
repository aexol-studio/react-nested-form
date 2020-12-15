import * as styles from '../style/Date';

export type DateInterface = {
  placeholder?: string;
  minYear?: number;
  maxYear?: number;
  label?: string;
  locale?: 'pl' | 'en';
  styles?: typeof styles;
};
