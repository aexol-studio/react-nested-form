import * as React from 'react';
import * as classnames from 'classnames';
import { Checkbox as importedStyle } from './style';
import { FieldDefinition } from '../fields';

export class Checkbox extends React.Component<FieldDefinition<'boolean'>> {
  render() {
    const { name, value, onChange, styles: overrideStyles } = this.props;
    let styles = {
      ...importedStyle
    };
    if (overrideStyles) {
      styles = {
        ...styles,
        ...overrideStyles
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
              [styles.checked]: value
            })}
          />
        </div>
      </div>
    );
  }
}
