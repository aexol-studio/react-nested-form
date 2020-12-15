import * as styles from '../style/Datetime';

export type DatetimeInterface = {
  label?: string;
  locale?: 'pl' | 'en';
  styles?: typeof styles;
  initialValue?: string;
};
