import { ReactElement, CSSProperties, ChangeEvent } from 'react';

export interface CheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ checked, indeterminate = false, className = '', style = {}, disabled = false, onChange }: CheckboxProps): ReactElement => {
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
      onChange={e => {
        /* istanbul ignore else */
        if (onChange) {
          onChange(e);
        }
      }}
    />
  );
};

export default Checkbox;
