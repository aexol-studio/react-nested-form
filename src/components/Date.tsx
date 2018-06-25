import * as React from 'react';
import * as moment from 'moment';
import { MultiSelect } from './MultiSelect';
import { Date as importedStyle } from './style';
import { FieldDefinition } from '../fields';

export class Date extends React.Component<FieldDefinition<'date'>> {
  render() {
    const {
      styles: overrideStyles,
      onChange,
      minYear = 1910,
      maxYear = 2050,
      value = moment(),
      name
    } = this.props;
    let styles = {
      ...importedStyle
    };
    if (overrideStyles) {
      styles = {
        ...styles,
        ...overrideStyles
      };
    }
    const months = moment.months().map((v, i) => ({ label: v, value: i + 1 }));
    const currentMonth = value.month() + 1;
    const currentYear = value.year();
    const currentDay = value.date();
    const daysInMonth = new Array(value.daysInMonth())
      .fill(0)
      .map((v, i) => ({ label: i + 1, value: i + 1 }));
    const yearsToShow = new Array(maxYear - minYear).fill(0).map((y, i) => ({
      label: y + minYear + i,
      value: y + minYear + i
    }));
    yearsToShow.reverse();
    return (
      <div className={styles.Date}>
        <MultiSelect
          name={name}
          options={daysInMonth}
          value={daysInMonth.find((m) => m.value === currentDay).value}
          onChange={(e) => {
            onChange(value.date(e.value));
          }}
        />
        <MultiSelect
          name={name}
          options={months}
          value={months.find((m) => m.value === currentMonth).value}
          onChange={(e) => {
            onChange(value.month(e.value - 1));
          }}
        />
        <MultiSelect
          name={name}
          options={yearsToShow}
          value={yearsToShow.find((m) => m.value === currentYear).value}
          onChange={(e) => {
            onChange(value.year(e.value));
          }}
        />
      </div>
    );
  }
}
