import * as React from 'react';
import { NestArray as styles } from './style';
import { Form } from '..';
import { FieldDefinition } from '../fields';
export class NestArray extends React.Component<FieldDefinition<'nestArray'>> {
  edit = (e, i) => {
    const values = [...this.props.value];
    values[i] = e;
    this.props.onChange([...values]);
  };
  remove = (i) => {
    const values = [...this.props.value];
    values.splice(i, 1);
    this.props.onChange([...values]);
  };
  add = (e) => {
    this.props.onChange([...this.props.value, e]);
  };
  render() {
    const { styles: overrideStyles, value = [], fields } = this.props;
    return (
      <React.Fragment>
        {value &&
          value.map((v, i) => (
            <div className={styles.Inline} key={i}>
              <Form
                className={overrideStyles ? overrideStyles.Nest : styles.Nest}
                fields={fields}
                sendFullObject={true}
                validate={(e) => {
                  this.edit(e, i);
                }}
                values={v}
                submitText="Edit"
              />
              <button
                className={styles.Remove}
                onClick={() => {
                  this.remove(i);
                }}
              >
                x
              </button>
            </div>
          ))}
        <Form
          className={overrideStyles ? overrideStyles.Nest : styles.Nest}
          fields={fields}
          validate={(e) => {
            this.add(e);
          }}
          submitText="Add"
        />
      </React.Fragment>
    );
  }
}
