import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { FieldDefinition } from '../fields';
import { Multiselect as importedStyles } from './style';

export const MultiSelect: React.FC<FieldDefinition<'select'>> = ({
  value: fieldValue,
  blockEmpty,
  options,
  onChange,
  multi,
  noSort,
  placeholder,
  styles: overrideStyles,
  style = {},
}) => {
  const [state, setState] = useState({
    isOpen: false,
    inputMatch: '',
  });
  useEffect(() => {
    document.addEventListener('click', documentClickHandler, true);
    return () => document.removeEventListener('click', documentClickHandler, true);
  }, []);

  const documentClickHandler = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };
  const addValue = (value: any) => {
    let fv = fieldValue || [];
    if (!fv) {
      if (multi) {
        fv = [];
      }
    }
    let vals: any = value;
    if (multi && vals) {
      vals = Array.from(new Set([...fv, vals]));
    }
    onChange(vals);
    setState({
      ...state,
      isOpen: !!multi,
    });
  };
  if (options.length === 0) {
    fieldValue = null;
    console.warn('Options of Multiselect cannot be empty');
  }
  options = options.map((o) => ({ ...o, label: `${o.label}` }));
  if (!noSort) {
    options.sort((a, b) => a.label.localeCompare(b.label));
  }
  if (!blockEmpty) {
    options = [{ label: '-------------', value: null }, ...options];
  }
  let styles = {
    ...importedStyles,
  };
  if (overrideStyles) {
    styles = {
      ...styles,
      ...overrideStyles,
    };
  }
  if (!fieldValue) {
    fieldValue = null;
  }
  if (multi && Array.isArray(fieldValue) && fieldValue.length === 0) {
    fieldValue = null;
  }
  let selectOptions = [...options];
  if (multi) {
    if (fieldValue) {
      selectOptions = selectOptions.filter((o) => !fieldValue.includes(o.value));
    }
  } else {
    selectOptions = selectOptions.filter((o) => o.value !== fieldValue);
  }
  const selectObject = (
    <div className={styles.holderValue}>
      {fieldValue ? (
        multi ? (
          fieldValue.map((value: any, index: number) => (
            <div
              className={classnames({
                [styles.showValue]: true,
                [styles.emptyValue]: !value,
              })}
              key={index}
            >
              <span className={styles.valueChoosen}>
                {value && options.find((o) => o.value === value)
                  ? options.find((o) => o.value === value)!.label
                  : 'Error - no value'}
              </span>
              {multi && (
                <span
                  className={styles.Delete}
                  onClick={(e) => {
                    e.stopPropagation();
                    const newValue = fieldValue.filter((i: any) => i !== value);
                    onChange(newValue);
                  }}
                >
                  ×
                </span>
              )}
            </div>
          ))
        ) : (
          <div
            className={classnames({
              [styles.showValue]: true,
              [styles.emptyValue]: true,
            })}
          >
            <span className={styles.valueChoosen}>
              {options.find((o) => o.value === fieldValue)
                ? options.find((o) => o.value === fieldValue)!.label
                : 'Error - no value'}
            </span>
            <span
              className={styles.Delete}
              onClick={(e) => {
                e.stopPropagation();
                const newValue = null;
                onChange(newValue);
              }}
            >
              ×
            </span>
          </div>
        )
      ) : (
        <input
          id="placeholder"
          placeholder={placeholder}
          className={styles.placeholderValue}
          onChange={(e) =>
            setState({
              ...state,
              inputMatch: e.target.value,
            })
          }
        />
      )}
    </div>
  );
  return (
    <div className={styles.MultiSelect} style={style}>
      <div
        onClick={() => {
          setState({
            ...state,
            isOpen: !state.isOpen,
          });
        }}
        className={classnames({
          [styles.holderSelect]: true,
          [styles.Change]: state.isOpen,
        })}
      >
        {selectObject}
        <span
          className={classnames({
            [styles.SelectArrow]: true,
            [styles.Change]: state.isOpen,
          })}
        />
      </div>
      <ul
        className={classnames({
          [styles.holderValues]: true,
          [styles.open]: state.isOpen,
        })}
      >
        {state.inputMatch
          ? selectOptions
              .filter((o) => o.label.toLowerCase().match(state.inputMatch.toLowerCase()))
              .map(({ label, value }, index) => {
                return (
                  <li
                    onClick={() => {
                      addValue(value);
                    }}
                    key={index}
                  >
                    {label}
                  </li>
                );
              })
          : selectOptions.map(({ label, value }, index) => {
              return (
                <li
                  onClick={() => {
                    addValue(value);
                  }}
                  key={index}
                >
                  {label}
                </li>
              );
            })}
      </ul>
    </div>
  );
};
