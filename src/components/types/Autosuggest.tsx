import * as styles from '../style/Autosuggest';
export interface AutosuggestInterface {
  load: (e: string) => void;
  list: Array<string>;
  placeholder?: string;
  initialValue?: string;
  label?: string;
  styles?: typeof styles;
}
