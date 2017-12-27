import * as React from 'react';
import { CheckboxProps } from './index';

export default class Checkbox extends React.Component<CheckboxProps, any> {
  static defaultProps: Partial<CheckboxProps> = {
    indeterminate: false,
    className: '',
    onChange: () => {}     // tslint:disable-line no-empty
  };

  render() {
    const { className, checked, indeterminate, onChange } = this.props;
    return (
      <input
        type="checkbox"
        className={className}
        ref={input => {
          if (input) {
            input.checked = checked;
            input.indeterminate = indeterminate as boolean;
          }
        }}
        onChange={onChange}
      />
    );
  }
}
