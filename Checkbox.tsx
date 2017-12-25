import * as React from 'react';
import { CheckboxProps } from './index';

export default class Checkbox extends React.Component<CheckboxProps, any> {
  static defaultProps: Partial<CheckboxProps> = {
    indeterminate: false,
    onChange: () => {}     // tslint:disable-line no-empty
  };

  render() {
    const { checked, indeterminate, onChange } = this.props;
    return (
      <input
        type="checkbox"
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
