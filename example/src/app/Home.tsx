import * as React from 'react';
import {
  Form,
  Input,
  FieldDefinition,
  SubmitComponent,
  styles,
  FieldWrapperProps
} from 'nested-form';
import { style, classes } from 'typestyle';
const opts = [
  {
    label: 'Helo',
    value: 1
  },
  {
    label: 'Helo2',
    value: 2
  }
];
const opts2 = [
  {
    label: 'Helo',
    value: 1
  },
  {
    label: 'Helo2',
    value: 2
  }
];
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

const myList = ['Cat', 'Caturday', 'KeyboardCat', 'Dog', 'Crocodile', 'Doge'];

export class Frwap extends React.Component<FieldWrapperProps> {
  render() {
    return (
      <React.Fragment>
        <div>{this.props.children}</div>
        <div>{this.props.error}</div>
      </React.Fragment>
    );
  }
}

export type HomeState = {
  list: string[];
};

export class Home extends React.Component<{}, HomeState> {
  state: HomeState = {
    list: []
  };
  render() {
    return (
      <div
        style={{
          margin: 'auto',
          width: 320,
          marginTop: 100
        }}
      >
        <Form
          values={{
            naa: [
              {
                hello: 'ddd',
                sel: 1
              },
              {
                hello: 'aaa',
                sel: 2
              },
              {
                hello: 'ddd',
                sel: null
              }
            ]
          }}
          fields={[
            {
              fieldType: 'string',
              name: 'hello',
              content: {
                pattern: '[a-z]*'
              },
              validate: (e: string) => {
                const ma = e.match(/[a-z]*/).length === e.length;
                console.log(ma);
                if (!ma) {
                  throw new Error('Invalid field');
                }
                return true;
              },
              required: true
            },
            {
              fieldType: 'autosuggest',
              name: 'suggestions',
              content: {
                list: this.state.list,
                load: (e) => {
                  // It receives user input and match suggestions from list
                  this.setState({
                    list: myList.filter((element) => element.match(e))
                  });
                },
                styles: RedAutoSuggest
              }
            },
            {
              fieldType: 'select',
              name: 'selectsingle',
              content: {
                placeholder: 'single select',
                multi: false,
                options: opts
              }
            },
            {
              fieldType: 'array',
              name: 'artest',
              content: {
                placeholder: 'ARRAY',
                unique: true
              }
            },
            {
              fieldType: 'nestArray',
              name: 'naa',
              content: {
                fields: [
                  {
                    fieldType: 'string',
                    name: 'hello',
                    content: {}
                  },
                  {
                    fieldType: 'select',
                    name: 'sel',

                    content: {
                      placeholder: 'single select',
                      multi: false,
                      options: opts
                    }
                  }
                ]
              }
            },
            {
              fieldType: 'select',
              name: 'select',
              content: {
                placeholder: 'multi select',
                multi: true,
                options: opts2
              }
            },
            {
              fieldType: 'date',
              name: 'dat',
              content: {
                maxYear: 2030,
                minYear: new Date().getFullYear()
              }
            },
            {
              fieldType: 'nest',
              name: 'nest',
              content: {
                fields: [
                  {
                    fieldType: 'string',
                    name: 'hello',
                    content: {}
                  },
                  {
                    fieldType: 'select',
                    name: 'selectsingle',
                    content: {
                      placeholder: 'single select',
                      multi: false,
                      options: opts
                    }
                  },
                  {
                    fieldType: 'array',
                    name: 'artest',
                    content: {
                      placeholder: 'ARRAY',
                      unique: true
                    }
                  },
                  {
                    fieldType: 'select',
                    name: 'select',
                    content: {
                      placeholder: 'multi select',
                      multi: true,
                      options: opts2
                    }
                  }
                ]
              }
            }
          ]}
          validate={(e) => {
            console.log(e);
          }}
          AlternativeWrapper={Frwap}
          submitText="Login"
        />
      </div>
    );
  }
}
