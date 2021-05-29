export interface CheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ checked, indeterminate = false, className = '', style = {}, disabled = false, onChange }: CheckboxProps): JSX.Element => {
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
