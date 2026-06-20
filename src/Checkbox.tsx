import { ChangeEvent, ComponentPropsWithoutRef, Ref, useCallback } from 'react';

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'checked' | 'onChange' | 'readOnly'> {
  checked: boolean;
  indeterminate?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  ref?: Ref<HTMLInputElement>;
}

const Checkbox = ({
  checked,
  indeterminate = false,
  onChange,
  ref: forwardedRef,
  ...rest
}: CheckboxProps) => {
  const ref = useCallback((input: HTMLInputElement | null) => {
    if (input) input.indeterminate = indeterminate;
    if (typeof forwardedRef === 'function') forwardedRef(input);
    else if (forwardedRef) forwardedRef.current = input;
  }, [indeterminate, forwardedRef]);

  return (
    <input
      {...rest}
      type="checkbox"
      checked={checked}
      readOnly={!onChange}
      ref={ref}
      onChange={onChange}
    />
  );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
