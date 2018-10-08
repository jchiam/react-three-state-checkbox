import * as React from 'react';

export interface CheckboxProps extends React.Props<Checkbox> {
  checked: boolean;
  indeterminate?: boolean;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  onChange?: (e: React.FormEvent) => void;
}

export default class Checkbox extends React.Component<CheckboxProps, any> {
  static defaultProps: Partial<CheckboxProps> = {
    indeterminate: false,
    className: '',
    style: {},
    disabled: false
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
        onChange={(e: React.FormEvent) => {
          /* istanbul ignore else */
          if (onChange) {
            onChange(e);
          }
        }}
      />
    );
  }
}
