import React, { useState } from 'react';
import classnames from 'classnames';
import { FieldDefinition } from '../fields';
import { Option as importedStyles } from './style';

export const Option: React.FC<FieldDefinition<'option'>> = ({
  value,
  options,
  prefferedOptions,
  showMoreText = 'show more',
  onChange,
  styles: overrideStyles,
  style = {},
}) => {
  const [activeValue, setActiveValue] = useState(value);
  const [showAll, setShowAll] = useState(false);

  const changeValue = (el: string) => {
    setActiveValue(el)
    onChange(el);
  };

  let styles = {
    ...importedStyles,
  };
  if (overrideStyles) {
    styles = {
      ...styles,
      ...overrideStyles,
    };
  }

  return (
    <div className={styles.OptionContainer} style={style}>
      {(!prefferedOptions || prefferedOptions.length === 0 || showAll) && options.map(el => {
          return (
              <button onClick={() => changeValue(el)} className={classnames(styles.Option, {
              active: activeValue === el})}>{el}</button>
          )
      })}
      {prefferedOptions && prefferedOptions.length > 0 && !showAll && <div className={styles.PrefferedOptionsContainer}>
        <div className={styles.OptionContainer}>
          {
            prefferedOptions.map(el => {
              return (
                  <button onClick={() => changeValue(el)} className={classnames(styles.Option, {
                  active: activeValue === el})}>{el}</button>
              )
          })}
        </div>
        <button className={styles.ShowMoreButton} onClick={() => setShowAll(true)}>
          {showMoreText}
        </button>
      </div>}
    </div>
  );
};
