_"100% bad....never use nested forms"_ - Harry Joy, stackoverflow.com May 11 '11 at 4:34

_"A kitten dies every time you use nested forms"_ - Ibu, stackoverflow.com May 11 '11 at 5:12

Yes, that's how

```html
<form action="killmeplease">
    <input name="now" type="text" />
</form>
```

html component work. This is why I think we need a new forms standard for react library.

```html
<form action="you">
    <form action="can't">
        <form action="do">
            <form action="that">
            </form>
        </form>
    </form>
</form>
```

Welcome

# nested-form

## Installation

```sh
$ npm add nested-form
```

Library created to enable nested forms inside of your project. Every component is 100% Modular composed of replacable, extendable Components of form. You can replace or extend every component with your style or your new react component. You can write validate functions for every field, form and nested form. You can use validation on edit.

```tsx
import * as React from 'react'
import { Form } from 'react-nested-form'

const YourComponent = () => (
    <div>
        <h1>I am a form</div>
        <Form
            fields={[
                {
                    name: 'important',
                    fieldType: 'string',
                    validate: (e) => e === "password"
                    content: {
                        placeholder:'Important...',
                    },
                    required: true
                },
                {
                    name: 'data',
                    fieldType: 'select',
                    content:{
                        multi: true,
                        placeholder:'Data...',
                        options:[
                            {
                                label:'very data 1',
                                value:1
                            },
                            {
                                label:'very data 2',
                                value:2
                            }
                        ]
                    }
                },
                {
                    name:'iCanDoThat',
                    fieldType: 'nest',
                    content:{
                        fields:[
                            {
                                name:'IAmNested',
                                fieldType:'string',
                            }
                        ]
                    }
                },
                {
                    name:'nestArrayIsUseful',
                    fieldType: 'nestArray',
                    content:{
                        fields:[
                            {
                                name:'forAddableObjects',
                                fieldType:'string',
                            }
                        ]
                    }
                }
            ]}
            validate={e => {
                // This will only fire when 1 field is filled with 'password'
                fetch(`https://send-data-somewhere.com/?data=${JSON.stringify(e)}`)
            }}
        />
    </div>
)
```

## Wrapper

It is also possible to replace form field Wrapper that wraps every field

```tsx
import * as React from 'react'
import { Form } from 'react-nested-form'

const YourComponent = () => (
    <div>
        <h1>I am a form</div>
        <Form
            fields={[
                {
                    name: 'important',
                    fieldType: 'string',
                    content: {
                        placeholder:'Important...',
                    },
                    required: true,
                    Component
                }
            ]}
            AlternativeWrapper={({children,field,error})=> (
                <div className="Wrap">
                    <div className="Label">{field.content.placeholder || field.name}</div>
                    <div className="Field">{children}</div>
                    {error && <div className="Errors">{error}</div>}
                </div>
            )}
            validate={e => {
                // This will only fire when 1 field is filled with 'password'
                fetch(`https://send-data-somewhere.com/?data=${JSON.stringify(e)}`)
            }}
        />
    </div>
)
```

## Component Replace

```tsx
import * as React from 'react';
import { Form, Input, FieldDefinition } from 'react-nested-form';

export const CustomInput: typeof Input = (props: FieldDefinition<'string'>) => (
  <input
    type="text"
    value={props.value}
    onChange={(e) => {
      props.onChange(e.target.value);
    }}
    style={{
      padding:20
    }}
  />
);

const YourComponent = () => (
    <div>
        <h1>I am a form</div>
        <Form
            fields={[
                {
                    name: 'important',
                    fieldType: 'string',
                    content: {
                        placeholder:'Important...',
                    },
                    required: true,
                    Component: CustomInput
                }
            ]}
            validate={e => {
                // This will only fire when 1 field is filled with 'password'
                fetch(`https://send-data-somewhere.com/?data=${JSON.stringify(e)}`)
            }}
        />
    </div>
)
```

## Submit button

```tsx
import * as React from 'react';
import { Form, Input, FieldDefinition, SubmitComponent } from 'react-nested-form';


export const CustomSubmit: typeof SubmitComponent = ({ submitText, onClick }) => (
  <div onClick={onClick}>{submitText}</div>
);
const YourComponent = () => (
    <div>
        <h1>I am a form</div>
        <Form
            fields={[
                {
                    name: 'important',
                    fieldType: 'string',
                    content: {
                        placeholder:'Important...',
                    },
                    required: true,
                }
            ]}
            Submit={CustomSubmit}
            validate={e => {
                // This will only fire when 1 field is filled with 'password'
                fetch(`https://send-data-somewhere.com/?data=${JSON.stringify(e)}`)
            }}
        />
    </div>
)
```

## Component Styling

(Typestyle)[https://github.com/typestyle/typestyle] is a great styling library for React and typescript and was used to write this lib. You have to use it if you want to extend styles of components. If you want to keep, overwrite or replace them, you are fine with any css library.

### Replacing a style

```tsx
import * as React from 'react';
import { Form, Input, FieldDefinition, SubmitComponent,styles } from '@slothking-online/form';
import { style } from "typestyle";

export const BigInput: typeof styles.Input = {
  Input: style({
    padding:30,
    fontSize:20
  })
}

const YourComponent = () => (
    <div>
        <h1>I am a form</div>
        <Form
            fields={[
                {
                    name: 'important',
                    fieldType: 'string',
                    content: {
                        placeholder:'Important...',
                        styles:BigInput
                    },
                    required: true,
                }
            ]}
            Submit={CustomSubmit}
            validate={e => {
                // This will only fire when 1 field is filled with 'password'
                fetch(`https://send-data-somewhere.com/?data=${JSON.stringify(e)}`)
            }}
        />
    </div>
)
```

### Extending style

```tsx
import * as React from 'react';
import { Form, Input, FieldDefinition, SubmitComponent,styles } from '@slothking-online/form';
import { style, classes } from "typestyle";

export const RedAutoSuggest: typeof styles.Autosuggest = {
  ...styles.Autosuggest,
  datalistSuggest: classes(
    styles.Autosuggest.datalistSuggest,
    style({
      background: 'red'
    })
  )
};

const myList = ['Cat', 'Caturday', 'KeyboardCat', 'Dog', 'Crocodile', 'Doge']

class YourComponent extends React.Component<{},{
    list: string[]
}> {
    state={
        list:[]
    }
    render(){
        return (
            <div>
                <h1>I am a form</div>
                <Form
                    fields={[
                        {
                            fieldType: 'autosuggest',
                            name:'suggestions',
                            content:{
                                list:this.state.list,
                                load:(e) => {
                                    // It receives user input and match suggestions from list
                                    this.setState({
                                        list: myList.filter( element => element.match(e) )
                                    })
                                },
                                styles: RedAutoSuggest
                            }
                        }
                    ]}
                    Submit={CustomSubmit}
                    validate={e => {
                        // This will only fire when 1 field is filled with 'password'
                        fetch(`https://send-data-somewhere.com/?data=${JSON.stringify(e)}`)
                    }}
                />
            </div>
        )
    }
}
```

## Autocomplete

This library is written in typescript so everybody will be 100% autocompleted.
