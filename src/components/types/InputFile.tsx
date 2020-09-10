import * as styles from '../style/File';
export interface FileInterface {
  styles?: typeof styles;
  onChange: (e: File) => void;
  label?: string;
}
