import React from 'react';
import { NestArray as styles } from './style';
import { Form } from '..';
import { FieldDefinition } from '../fields';
export const NestArray: React.FC<FieldDefinition<'nestArray'>> = ({
  styles: overrideStyles,
  value = [],
  fields,
  onChange,
}) => {
  const edit = (e: any, i: number) => {
    const values = [...value];
    values[i] = e;
    onChange([...values]);
  };
  const remove = (i: any) => {
    const values = [...value];
    values.splice(i, 1);
    onChange([...values]);
  };
  const add = (e: any) => {
    onChange([...value, e]);
  };
  return (
    <React.Fragment>
      {value &&
        value.map((v: any, i: number) => (
          <div className={styles.Inline} key={i}>
            <Form
              className={overrideStyles ? overrideStyles.Nest : styles.Nest}
              fields={fields}
              sendFullObject={true}
              validate={(e: any) => {
                edit(e, i);
              }}
              values={v}
              validateOnChange={true}
              submitText="Edit"
            />
            <button
              className={styles.Remove}
              onClick={() => {
                remove(i);
              }}
            >
              x
            </button>
          </div>
        ))}
      w
      <Form
        className={overrideStyles ? overrideStyles.Nest : styles.Nest}
        fields={fields}
        validate={(e: any) => {
          add(e);
        }}
        submitText="Add"
      />
    </React.Fragment>
  );
};
