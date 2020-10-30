import React, { useState } from 'react';
import classnames from 'classnames';
import { FieldDefinition } from '../fields';
import { MultiSelect as importedStyles } from './style';

export const MultiSelect: React.FC<FieldDefinition<'multiselect'>> = ({
  value: fieldValue,
  blockEmpty,
  options,
  onChange,
  noSort,
  placeholder,
  styles: overrideStyles,
  style = {},
  disabled = false,
}) => {
  const [state, setState] = useState({
    isOpen: false,
    inputMatch: '',
  });

  const addValue = (value: any) => {
    let fv = fieldValue || [];
    if (!fv) {
      fv = [];
    }
    let vals: any = value;
    if (vals) {
      vals = Array.from(new Set([...fv, vals]));
    }
    setState({
      ...state,
      isOpen: true,
    });
    onChange(vals);
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
  if (Array.isArray(fieldValue) && fieldValue.length === 0) {
    fieldValue = null;
  }
  let selectOptions = [...options];
  if (fieldValue) {
    selectOptions = selectOptions.filter((o) => !fieldValue.includes(o.value));
  }

  return (
    <div className={classnames(styles.MultiSelect, { disabled: disabled })} style={style}>
      {state.isOpen && (
        <div
          onClick={() => setState({ ...state, isOpen: false })}
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            top: 0,
            left: 0,
          }}
        />
      )}
      <div
        onClick={() => {
          console.log(!state.isOpen);
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
        <div className={styles.holderValue}>
          {fieldValue ? (
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
              </div>
            ))
          ) : (
            <input
              id="placeholder"
              placeholder={placeholder}
              className={styles.placeholderValue}
              autoComplete="off"
              onChange={(e) =>
                setState({
                  ...state,
                  inputMatch: e.target.value,
                })
              }
            />
          )}
        </div>
        <span
          className={classnames({
            [styles.SelectArrow]: true,
            [styles.Change]: state.isOpen,
          })}
        />
      </div>
      {state.isOpen && (
        <ul
          className={classnames({
            [styles.holderValues]: true,
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
      )}
    </div>
  );
};
