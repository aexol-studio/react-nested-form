import React from 'react';
import classnames from 'classnames';
import { Checkbox as importedStyle } from './style';
import { FieldDefinition } from '../fields';

export const Checkbox: React.FC<FieldDefinition<'boolean'>> = ({
  name,
  value,
  onChange,
  description,
  descriptionPosition,
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
      {description && descriptionPosition === 'left' && (
        <span className={classnames(styles.Description, { ['left']: true })}>{description}</span>
      )}
      <div className={styles.border}>
        <div
          className={classnames({
            [styles.tick]: true,
            [styles.checked]: value,
          })}
        />
      </div>
      {description && descriptionPosition === 'right' && (
        <span className={classnames(styles.Description, { ['right']: true })}>{description}</span>
      )}
    </div>
  );
};
