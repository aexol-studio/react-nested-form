import * as React from 'react';
import * as classnames from 'classnames';
import { FieldDefinition } from '../fields';
import { Multiselect as importedStyles } from './style';

export class MultiSelect extends React.Component<FieldDefinition<'select'>> {
  state = {
    isOpen: false,
    inputMatch: null
  };
  componentDidMount() {
    document.addEventListener('click', this.documentClickHandler, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.documentClickHandler, true);
  }

  documentClickHandler = () => {
    this.setState({
      isOpen: false
    });
  };
  addValue = (value) => { 
    let { value: fieldValue = [], onChange, multi = false } = this.props;
    if (!fieldValue) {
      if (multi) {
        fieldValue = [];
      }
    }
    let vals: any = value;
    if (multi && vals) {
      vals = Array.from(new Set([...fieldValue, vals]));
    }
    onChange(vals);
    this.setState({
      isOpen: multi
    });
  };

  render() {
    let {
      placeholder,
      options,
      onChange,
      multi,
      styles: overrideStyles,
      value: fieldValue,
      blockEmpty,
      noSort,
      style = {}
    } = this.props;
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
      ...importedStyles
    };
    if (overrideStyles) {
      styles = {
        ...styles,
        ...overrideStyles
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
            fieldValue.map((value, index) => (
              <div
                className={classnames({
                  [styles.showValue]: true,
                  [styles.emptyValue]: !value
                })}
                key={index}
              >
                <span className={styles.valueChoosen}>
                  {value && options.find((o) => o.value === value)
                    ? options.find((o) => o.value === value).label
                    : 'Error - no value'}
                </span>
                {multi && (
                  <span
                    className={styles.Delete}
                    onClick={(e) => {
                      e.stopPropagation();
                      const newValue = fieldValue.filter((i) => i !== value);
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
                [styles.emptyValue]: true
              })}
            >
              <span className={styles.valueChoosen}>
                {options.find((o) => o.value === fieldValue)
                  ? options.find((o) => o.value === fieldValue).label
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
          <input id="placeholder" placeholder={placeholder} className={styles.placeholderValue} 
            onChange={(e)=>
              this.setState({
                inputMatch: e.target.value,
              })} 
          />
        )}
      </div>
    );
    return (
      <div className={styles.MultiSelect} style={style}>
        <div
          onClick={() => {
            this.setState({
              isOpen: !this.state.isOpen,
            });
          }}
          className={classnames({
            [styles.holderSelect]: true,
            [styles.Change]: this.state.isOpen
          })}
        >
          {selectObject}
          <span
            className={classnames({
              [styles.SelectArrow]: true,
              [styles.Change]: this.state.isOpen
            })}
          />
        </div>
        <ul
          className={classnames({
            [styles.holderValues]: true,
            [styles.open]: this.state.isOpen
          })}
        >
          {this.state.inputMatch 
          ?
          selectOptions.filter(o => o.label.toLowerCase().match(this.state.inputMatch.toLowerCase())).map(({ label, value }, index) => {
            return (
              <li
                onClick={() => {
                  this.addValue(value);
                }}
                key={index}
              >
                {label}
              </li>
            );
          })
        :
        selectOptions.map(({ label, value }, index) => {
          return (
            <li
              onClick={() => {
                this.addValue(value);
              }}
              key={index}
            >
              {label}
            </li>
          );
        })
        }
        </ul>
      </div>
    );
  }
}
