import { ReactElement, CSSProperties, ChangeEvent, useCallback } from 'react';

export interface CheckboxProps {
  checked: boolean;
  indeterminate?: boolean;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({
  checked,
  indeterminate = false,
  className = '',
  style = {},
  disabled = false,
  onChange
}: CheckboxProps): ReactElement => {
  const ref = useCallback((input: HTMLInputElement | null) => {
    if (input) input.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      readOnly={!onChange}
      className={className}
      style={style}
      ref={ref}
      onChange={onChange}
    />
  );
};

export default Checkbox;
