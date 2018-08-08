import * as React from 'react';
import { Form } from '@slothking-online/form';
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
export const Home = (props) => (
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
      submitText="Login"
    />
  </div>
);
