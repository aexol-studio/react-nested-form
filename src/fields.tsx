import * as types from './components/types';
export type FieldType = {
  autosuggest: types.AutosuggestInterface;
  string: types.InputInterface;
  boolean: types.CheckboxInterface;
  integer: types.InputInterface;
  float: types.InputInterface;
  text: types.TextareaInterface;
  select: types.MultiSelectInterface | types.SingleSelectInterface;
  file: types.FileInterface;
  datetime: types.DatetimeInterface & types.DateInterface & types.TimeInterface;
  time: types.TimeInterface;
  date: types.DateInterface;
  reference: types.SingleSelectInterface;
  array: types.TagType;
  nest: types.NestInterface;
  nestArray: types.NestArrayInterface;
};
export type FieldDefinition<Type extends keyof FieldType> = {
  name: string;
  onChange: (e: any) => void;
  value: any;
} & FieldType[Type];

export type FieldDescription = (
  | {
      fieldType: 'autosuggest';
      content: FieldType['autosuggest'];
    }
  | {
      fieldType: 'string';
      content: FieldType['string'];
    }
  | {
      fieldType: 'boolean';
      content: FieldType['boolean'];
    }
  | {
      fieldType: 'integer';
      content: FieldType['integer'];
    }
  | {
      fieldType: 'float';
      content: FieldType['float'];
    }
  | {
      fieldType: 'number';
      content: FieldType['float'];
    }
  | {
      fieldType: 'text';
      content: FieldType['text'];
    }
  | {
      fieldType: 'select';
      content: FieldType['select'];
    }
  | {
      fieldType: 'file';
      content: FieldType['file'];
    }
  | {
      fieldType: 'datetime';
      content: FieldType['datetime'];
    }
  | {
      fieldType: 'time';
      content: FieldType['time'];
    }
  | {
      fieldType: 'date';
      content: FieldType['date'];
    }
  | {
      fieldType: 'reference';
      content: FieldType['reference'];
    }
  | {
      fieldType: 'array';
      content: FieldType['array'];
    }
  | {
      fieldType: 'nest';
      content: FieldType['nest'];
    }
  | {
      fieldType: 'nestArray';
      content: FieldType['nestArray'];
    }) & { required?: boolean; validate?: (e: any) => void; };
