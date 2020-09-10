import * as styles from '../style/Checkbox';
export type CheckboxInterface = {
  label?: string;
  description?: string;
  descriptionPosition?: 'right' | 'left';
  styles?: typeof styles;
};
