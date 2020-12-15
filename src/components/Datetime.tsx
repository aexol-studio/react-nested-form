import { Date } from './Date';
import { Time } from './Time';
import moment from 'moment';
import React, { useState } from 'react';
import { Datetime as importedStyle, Date as importedStyle2, Time as importedStyle3 } from './style';
import { FieldDefinition } from '../fields';

export const Datetime: React.FC<FieldDefinition<'datetime'>> = ({
  styles: overrideStyles,
  initialValue,
  value,
  onChange,
  name,
  minYear,
  maxYear,
  locale,
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

  const [currentValue, setCurrentValue] = useState(
    initialValue ? moment(initialValue).seconds(0) : moment().seconds(0)
  );

  return (
    <div className={styles.Datetime}>
      <Date
        name={name}
        styles={styles}
        value={currentValue}
        minYear={minYear}
        maxYear={maxYear}
        locale={locale}
        onChange={(e) => {
          onChange(e);
          setCurrentValue(e);
        }}
      />
      <Time
        name={name}
        styles={styles}
        value={currentValue.format('k:m')}
        onChange={(e) => {
          const [hour, minutes] = e.split(':');
          const changedValue = currentValue.hour(parseInt(hour)).minute(parseInt(minutes));
          onChange(changedValue);
          setCurrentValue(changedValue);
        }}
      />
    </div>
  );
};
