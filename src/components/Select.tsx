import React, { useState } from 'react';
import classnames from 'classnames';
import { FieldDefinition } from '../fields';
import { Multiselect as importedStyles } from './style';

export const Select: React.FC<FieldDefinition<'select'>> = ({
  value: fieldValue,
  blockEmpty,
  options,
  onChange,
  noSort,
  placeholder,
  search,
  styles: overrideStyles,
  style = {},
}) => {
  const [state, setState] = useState({
    isOpen: false,
    inputMatch: '',
  });

  const changeValue = (value: any) => {
    setState({
      ...state,
      isOpen: false,
    });
    onChange(value);
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
  let selectOptions = [...options].filter((o) => o.value !== fieldValue);

  return (
    <div className={styles.MultiSelect} style={style}>
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
            search ? (
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
              </div>
            )
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
                        changeValue(value);
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
                      changeValue(value);
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
