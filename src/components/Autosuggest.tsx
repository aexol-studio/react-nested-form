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
  }, value);
  const onChangeLocal = (newValue: any) => {
    setState({ ...state, setValue: newValue, showDatalist: true });
    if (newValue.length > 0) {
      load(newValue);
      onChange(newValue);
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
        <input
          {...props}
          onChange={(e) => {
            onChangeLocal(e.target.value);
          }}
          value={state.setValue}
          type="text"
          list={name}
          placeholder={placeholder || name}
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
                })}
                key={index}
                onClick={() => {
                  setState({
                    ...state,
                    setValue: i,
                    showDatalist: false,
                  });
                  onChangeLocal(i);
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
