export interface AutosuggestInterface {
  onSelect: Function;
  load: Function;
  list: Array<string>;
  placeholder?: string;
  initialValue?: string;
  styles?: {
    Autosuggest: string;
    datalistSuggest: string;
    showDataList: string;
    optionsSuggest: string;
  };
}