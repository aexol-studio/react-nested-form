export type SelectInterface = {
  options: Array<any>;
  style?: Object;
  placeholder?: string;
  styles?: {
    MultiSelect: string;
    holderSelect: string;
    Change: string;
    holderValue: string;
    showValue: string;
    valueChoosen: string;
    Delete: string;
    placeholderValue: string;
    SelectArrow: string;
    holderValues: string;
    open: string;
    emptyValue: string;
    [x: string]: string;
  };
};
export type SingleSelectInterface = SelectInterface & {
  multi?: false;
};
export type MultiSelectInterface = SelectInterface & {
  multi: true;
};
