import * as React from 'react';
import { CheckboxProps } from '../index';

export default class Checkbox extends React.Component<CheckboxProps, any> {
  /* istanbul ignore next: callback */
  static defaultProps: Partial<CheckboxProps> = {
    indeterminate: false,
    className: '',
    style: {},
    disabled: false,
    onChange: () => {}     // tslint:disable-line no-empty
  };

  render() {
    const { className, style, checked, indeterminate, onChange, disabled } = this.props;
    return (
      <input
        type="checkbox"
        className={className}
        style={style}
        ref={input => {
          /* istanbul ignore else */
          if (input) {
            input.checked = checked;
            input.indeterminate = indeterminate as boolean;
            input.disabled = disabled as boolean;
          }
        }}
        onChange={onChange}
      />
    );
  }
}
