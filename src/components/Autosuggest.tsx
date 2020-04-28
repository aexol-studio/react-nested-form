import * as React from 'react';
import * as classnames from 'classnames';
import { Autosuggest as importedStyle } from './style';
import { FieldDefinition } from '../fields';

export class Autosuggest extends React.Component<
  FieldDefinition<'autosuggest'>
> {
  state = {
    showDatalist: false,
    setValue: '',
    value: ''
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { initialValue = '' } = this.props;
    this.setState({
      setValue: initialValue
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value && this.state.value === '') {
      this.setState({
        setValue: nextProps.value
      });
    }
  }
  onChange = (e) => {
    const { load, onChange } = this.props;
    const newValue = e.target.value;
    this.setState({ setValue: newValue, showDatalist: true });
    if (newValue.length > 0) {
      load(newValue);
      onChange(newValue);
    }
  };
  render() {
    let {
      onChange,
      list = [],
      name = 'autosuggest',
      placeholder,
      initialValue,
      load,
      styles: overrideStyles,
      ...props
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
    return (
      <div>
        <div className={styles.Autosuggest}>
          <input
            {...props}
            onChange={this.onChange}
            value={this.state.setValue}
            type="text"
            list={name}
            placeholder={placeholder || name}
          />
          {list &&
            this.state.setValue && (
              <div
                className={classnames({
                  [styles.datalistSuggest]: true,
                  [styles.showDataList]: this.state.showDatalist
                })}
              >
                {list.map((i, index) => (
                  <div
                    className={classnames({
                      [styles.optionsSuggest]: true
                    })}
                    key={index}
                    onClick={() => {
                      this.setState({
                        setValue: i,
                        showDatalist: false
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
  }
}
