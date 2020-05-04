import React from 'react';
import classnames from 'classnames';
import { Checkbox as importedStyle } from './style';
import { FieldDefinition } from '../fields';

export const Checkbox: React.FC<FieldDefinition<'boolean'>> = ({
  name,
  value,
  onChange,
  styles: overrideStyles,
}) => {
  let styles = {
    ...importedStyle,
  };
  if (overrideStyles) {
    styles = {
      ...styles,
      ...overrideStyles,
    };
  }
  return (
    <div
      className={styles.Checkbox}
      onClick={() => {
        onChange(!value);
      }}
    >
      <label>{name}</label>
      <div className={styles.border}>
        <div
          className={classnames({
            [styles.tick]: true,
            [styles.checked]: value,
          })}
        />
      </div>
    </div>
  );
};
