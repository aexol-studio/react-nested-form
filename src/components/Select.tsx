import React, { useState } from 'react';
import classnames from 'classnames';
import { FieldDefinition } from '../fields';
import { MultiSelect as importedStyles } from './style';

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
  disabled = false,
}) => {
  const [state, setState] = useState({
    isOpen: false,
    inputMatch: '',
    focusedValue: { label: '', value: 'any' },
    selectedIndex: -1,
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
  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.keyCode === 40) {
      if (state.selectedIndex > -1) {
        setState((oldState) => ({
          ...state,
          selectedIndex: Math.min(oldState.selectedIndex + 1, options.length - 1),
          focusedValue: options[Math.min(oldState.selectedIndex + 1, options.length - 1)],
        }));
      } else {
        setState({ ...state, isOpen: true, focusedValue: options[0], selectedIndex: 0 });
      }
    } else if (e.key === 'ArrowUp' || e.keyCode === 38) {
      if (state.selectedIndex > -1) {
        setState((oldState) => ({
          ...state,
          selectedIndex: Math.max(oldState.selectedIndex - 1, 0),
          focusedValue: options[Math.max(oldState.selectedIndex - 1, 0)],
        }));
      }
    } else if (e.key === 'Enter' || e.keyCode === 13) {
      setState({ ...state, isOpen: false });
      changeValue(state.focusedValue.value);
      e.stopPropagation();
    } else if (e.key === 'Escape' || e.keyCode === 27) {
      setState({ ...state, isOpen: false });
    }
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

  let selectOptions = [...options].filter((o) => o.value !== fieldValue);

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
          {fieldValue !== undefined && fieldValue !== null ? (
            search ? (
              <div
                className={classnames({
                  [styles.showValue]: true,
                  [styles.emptyValue]: true,
                })}
              >
                <span className={styles.valueChoosen}>
                  {options.find((o) => o.value === fieldValue)
                    ? options.find((o) => o.value === fieldValue)?.label
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
                    ? options.find((o) => o.value === fieldValue)?.label
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
              onKeyDown={onKeyDownHandler}
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
                      className={classnames({
                        [styles.Li]: true,
                        active: state.focusedValue && state.focusedValue.value === value,
                      })}
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
                    className={classnames({
                      [styles.Li]: true,
                      active: state.focusedValue && state.focusedValue.value === value,
                    })}
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
