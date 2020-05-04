import React from 'react';
import moment from 'moment';
import { MultiSelect } from './MultiSelect';
import { Date as importedStyle } from './style';
import { FieldDefinition } from '../fields';

export const Date: React.FC<FieldDefinition<'date'>> = ({
  styles: overrideStyles,
  onChange,
  minYear = 1910,
  maxYear = 2050,
  value = moment(),
  name,
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
  const val = value as moment.Moment;
  const months = moment.months().map((v, i) => ({ label: v, value: i + 1 }));
  const currentMonth = val.month() + 1;
  const currentYear = val.year();
  const currentDay = val.date();
  const daysInMonth = new Array(val.daysInMonth())
    .fill(0)
    .map((v, i) => ({ label: `${i + 1}`, value: i + 1 }));
  const yearsToShow = new Array(maxYear - minYear).fill(0).map((y, i) => ({
    label: y + minYear + i,
    value: y + minYear + i,
  }));
  return (
    <div className={styles.Date}>
      <MultiSelect
        name={name}
        options={daysInMonth}
        value={daysInMonth.find((m) => m.value === currentDay)!.value}
        blockEmpty={true}
        noSort={true}
        multi={false}
        onChange={(e) => {
          onChange(val.date(e));
        }}
      />
      <MultiSelect
        name={name}
        options={months}
        value={months.find((m) => m.value === currentMonth)!.value}
        blockEmpty={true}
        noSort={true}
        multi={false}
        onChange={(e) => {
          onChange(val.month(e - 1));
        }}
      />
      <MultiSelect
        name={name}
        options={yearsToShow}
        value={yearsToShow.find((m) => m.value === currentYear)!.value}
        blockEmpty={true}
        noSort={true}
        multi={false}
        onChange={(e) => {
          onChange(val.year(e));
        }}
      />
    </div>
  );
};
