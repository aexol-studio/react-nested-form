import * as React from 'react';
import { NestArray as styles } from './style';
import { Form } from '..';
import { FieldDefinition } from '../fields';
export class NestArray extends React.Component<FieldDefinition<'nestArray'>, { values: any[] }> {
  state = {
    values: []
  };
  commit = () => {
    this.props.onChange(this.state.values);
  };
  edit = (e, i) => {
    const values = [...this.state.values];
    values[i] = e;
    this.setState(
      {
        values
      },
      this.commit
    );
  };
  remove = (i) => {
    const values = [...this.state.values];
    values.splice(i, 1);
    this.setState(
      {
        values
      },
      this.commit
    );
  };
  add = (e) => {
    this.setState(
      {
        values: [...this.state.values, e]
      },
      this.commit
    );
  };
  render() {
    const { styles: overrideStyles, value, fields } = this.props;
    return (
      <React.Fragment>
        {value &&
          value.map((v, i) => (
            <div className={styles.Inline}>
              <Form
                className={overrideStyles ? overrideStyles.Nest : styles.Nest}
                fields={fields}
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
          submitText="Edit"
        />
      </React.Fragment>
    );
  }
}
