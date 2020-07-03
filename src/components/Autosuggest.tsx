import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { Autosuggest as importedStyle } from './style';
import { FieldDefinition } from '../fields';

export const Autosuggest: React.FC<FieldDefinition<'autosuggest'>> = ({
  value,
  load,
  onChange,
  list = [],
  name = 'autosuggest',
  placeholder,
  initialValue = '',
  styles: overrideStyles,
  ...props
}) => {
  const [state, setState] = useState({
    showDatalist: false,
    setValue: '',
    value: '',
    focusedValue: '',
    selectedIndex: -1,
  });
  useEffect(() => {
    setState({
      ...state,
      setValue: initialValue,
    });
  }, []);
  useEffect(() => {
    if (value && state.value === '') {
      setState({
        ...state,
        setValue: value,
      });
    }
  }, [value]);
  const onChangeLocal = (newValue: any) => {
    setState({
      ...state,
      setValue: newValue,
      showDatalist: true,
      focusedValue: '',
      selectedIndex: -1,
    });
    if (newValue.length > 0) {
      load(newValue);
    }
  };
  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.keyCode === 40) {
      if (state.selectedIndex > -1) {
        setState((oldState) => ({
          ...state,
          selectedIndex: Math.min(oldState.selectedIndex + 1, list.length - 1),
          focusedValue: list[Math.min(oldState.selectedIndex + 1, list.length - 1)],
        }));
      } else {
        setState({ ...state, focusedValue: list[0], selectedIndex: 0 });
      }
    } else if (e.key === 'ArrowUp' || e.keyCode === 38) {
      if (state.selectedIndex > -1) {
        setState((oldState) => ({
          ...state,
          selectedIndex: Math.max(oldState.selectedIndex - 1, 0),
          focusedValue: list[Math.max(oldState.selectedIndex - 1, 0)],
        }));
      }
    } else if (e.key === 'Enter' || e.keyCode === 13) {
      setState({ ...state, setValue: state.focusedValue, showDatalist: false });
      onChange(state.focusedValue);
      e.stopPropagation();
    } else if (e.key === 'Escape' || e.keyCode === 27) {
      setState({ ...state, showDatalist: false });
    }
  };
  let styles = {
    ...importedStyle,
  };
  if (overrideStyles) {
    styles = {
      ...styles,
      ...overrideStyles,
    };
  }
  return (
    <div>
      <div className={styles.Autosuggest}>
        {state.showDatalist && (
          <div
            onClick={() => setState({ ...state, showDatalist: false })}
            style={{
              position: 'fixed',
              width: '100vw',
              height: '100vh',
              top: 0,
              left: 0,
            }}
          />
        )}
        <input
          {...props}
          onChange={(e) => {
            onChangeLocal(e.target.value);
          }}
          value={state.setValue}
          type="text"
          list={name}
          placeholder={placeholder || name}
          autoComplete="off"
          onKeyDown={onKeyDownHandler}
        />
        {list && state.setValue && (
          <div
            className={classnames({
              [styles.datalistSuggest]: true,
              [styles.showDataList]: state.showDatalist,
            })}
          >
            {list.map((i, index) => (
              <div
                className={classnames({
                  [styles.optionsSuggest]: true,
                  active: state.focusedValue && state.focusedValue === i,
                })}
                key={index}
                onClick={() => {
                  setState({
                    ...state,
                    setValue: i,
                    showDatalist: false,
                  });
                  onChange(i);
                }}
              >
                {i}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
