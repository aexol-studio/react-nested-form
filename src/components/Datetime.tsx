import { Date } from './Date';
import { Time } from './Time';
import moment from 'moment';
import React from 'react';
import { Datetime as importedStyle, Date as importedStyle2, Time as importedStyle3 } from './style';
import { FieldDefinition } from '../fields';

export const Datetime: React.FC<FieldDefinition<'datetime'>> = ({
  styles: overrideStyles,
  value = moment().second(0),
  onChange,
  name,
  minYear,
  maxYear,
}) => {
  let styles = {
    ...importedStyle,
    ...importedStyle2,
    ...importedStyle3,
  };
  if (overrideStyles) {
    styles = {
      ...styles,
      ...overrideStyles,
    };
  }
  return (
    <div className={styles.Datetime}>
      <Date
        name={name}
        styles={styles}
        value={value}
        minYear={minYear}
        maxYear={maxYear}
        onChange={(e) => {
          onChange(e);
        }}
      />
      <Time
        name={name}
        styles={styles}
        value={value.format('k:m')}
        onChange={(e) => {
          const [hour, minutes] = e.split(':');
          onChange(value.hour(parseInt(hour)).minute(parseInt(minutes)));
        }}
      />
    </div>
  );
};
