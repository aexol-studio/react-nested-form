import * as styles from '../style/Autosuggest';
export interface AutosuggestInterface {
  onSelect: Function;
  load: (e: string) => void;
  list: Array<string>;
  placeholder?: string;
  initialValue?: string;
  styles?: typeof styles;
}
