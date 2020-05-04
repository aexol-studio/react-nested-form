import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Tag as importedStyle } from './style';
import { FieldDefinition } from '../fields';

export const Tag: React.FC<FieldDefinition<'array'>> = ({
  onChange,
  value: fieldValue,
  placeholder,
  styles: overrideStyles,
  unique,
}) => {
  const [state, setState] = useState({
    inputValue: '',
    isOpen: false,
  });

  const documentClickHandler = () => {
    setState({
      ...state,
      isOpen: false,
    });
  };

  const preventEnter = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      e.stopPropagation();
      e.preventDefault();
      setState({
        isOpen: true,
        inputValue: '',
      });
    }
  };
  useEffect(() => {
    document.addEventListener('click', documentClickHandler, true);
    return () => document.removeEventListener('click', documentClickHandler, true);
  }, []);

  const addValue = () => {
    const { inputValue } = state;
    let FV = fieldValue || [];
    if (inputValue.length && (!FV.find((f: any) => f === inputValue) || !unique)) {
      FV = [...FV, inputValue];
      setState({
        ...state,
        inputValue: '',
      });
      onChange(FV);
    }
  };

  fieldValue = fieldValue || [];
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
    <div className={styles.Tag}>
      <div
        onClick={(e) => {
          setState({
            ...state,
            isOpen: !state.isOpen,
          });
        }}
        className={classnames({
          [styles.holderSelect]: true,
        })}
      >
        <div className={styles.holderValue}>
          {fieldValue.map((value: any, index: number) => (
            <div
              className={styles.showValue}
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                const newValue = fieldValue.filter((i: any) => i !== value);
                onChange(newValue);
              }}
            >
              <span className={styles.valueChosen}>{value}</span>
              <span className={styles.Delete}>×</span>
            </div>
          ))}
          <input
            ref={(input) => input}
            type="text"
            onClick={addValue}
            onKeyPress={(e) => {
              preventEnter(e);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                e.stopPropagation();
                e.preventDefault();
                addValue();
              }
            }}
            onKeyUp={(e) => {
              preventEnter(e);
            }}
            placeholder={placeholder}
            value={state.inputValue}
            onChange={(e) => {
              setState({
                ...state,
                inputValue: e.target.value,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};
