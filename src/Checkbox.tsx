import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useCallback } from 'react';

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'checked' | 'onChange' | 'readOnly'> {
  checked: boolean;
  indeterminate?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

// forwardRef is still required to forward refs under React 18, which this
// package supports (peerDependencies: react "18 || 19").
// eslint-disable-next-line @eslint-react/no-forward-ref
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  checked,
  indeterminate = false,
  onChange,
  ...rest
}, forwardedRef) => {
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
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
