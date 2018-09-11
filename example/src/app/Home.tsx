import * as React from 'react';
import { Form, Input, FieldDefinition, SubmitComponent, styles } from 'nested-form';
import { style, classes } from 'typestyle';
// const opts = [
//   {
//     label: 'Helo',
//     value: 1
//   },
//   {
//     label: 'Helo2',
//     value: 2
//   }
// ];
// const opts2 = [
//   {
//     label: 'Helo',
//     value: 1
//   },
//   {
//     label: 'Helo2',
//     value: 2
//   }
// ];
export const CustomInput: typeof Input = (props: FieldDefinition<'string'>) => (
  <input
    type="text"
    value={props.value}
    onChange={(e) => {
      props.onChange(e.target.value);
    }}
    style={{
      padding: 20
    }}
  />
);
export const CustomSubmit: typeof SubmitComponent = ({ submitText, onClick }) => (
  <div onClick={onClick}>{submitText}</div>
);

export const BigInput: typeof styles.Input = {
  Input: style({
    padding: 30,
    fontSize: 20
  })
};

export const RedAutoSuggest: typeof styles.Autosuggest = {
  ...styles.Autosuggest,
  datalistSuggest: classes(
    styles.Autosuggest.datalistSuggest,
    style({
      background: 'red'
    })
  )
};

// const myList = ['Cat', 'Caturday', 'KeyboardCat', 'Dog', 'Crocodile', 'Doge']

export const Home = (props) => (
  <div
    style={{
      margin: 'auto',
      width: 320,
      marginTop: 100
    }}
  >
  <Form validate={e=>{}} fields={{
    string:{
      fieldType:"string",
      content:{}
    }
  }} />
  </div>
);
