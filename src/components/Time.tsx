import * as React from 'react';
import { Time as importedStyle } from "./style";
import { FieldDefinition } from '../fields';

export class Time extends React.Component<FieldDefinition<'time'>> {
  render() {
    const { styles: overrideStyles, value = '0:0', onChange } = this.props;
    let styles = {
      ...importedStyle
    }
    if (overrideStyles) {
      styles = {
        ...styles,
        ...overrideStyles
      }
    }
    const [hours, minutes] = value.split(':');
    const format00 = (val) => (parseInt(val) < 10 ? '0' + val : val);
    return (
      <div className={styles.Time}>
        <input
          type="number"
          onChange={(e) => {
            let val = parseInt(e.target.value);
            if (val < 25 && val > -1) {
              onChange(`${e.target.value}:${minutes}`);
            }
          }}
          onFocus={(e) => {
            e.target.select();
          }}
          required={true}
          value={format00(hours)}
          min="0"
          max="24"
          step="1"
        />
        <input
          type="number"
          onChange={(e) => {
            let val = parseInt(e.target.value);
            if (val < 60 && val > -1) {
              onChange(`${hours}:${e.target.value}`);
            }
          }}
          onFocus={(e) => {
            e.target.select();
          }}
          required={true}
          value={format00(minutes)}
          min="0"
          max="59"
          step="1"
        />
      </div>
    );
  }
}
