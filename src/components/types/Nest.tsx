import * as styles from '../style/Nest';
import { FieldDescription } from '../../fields';
export type NestInterface = {
  styles?: typeof styles;
  fields: {
    [x: string]: FieldDescription;
  };
};
