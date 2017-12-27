import * as React from 'react';

export interface CheckboxProps extends React.Props<Checkbox> {
  checked: boolean;
  indeterminate?: boolean;
  className?: string;
  onChange?: () => void;
}

declare class Checkbox extends React.Component<CheckboxProps, any> {
}

declare module 'react-three-state-checkbox' {
}

export default Checkbox;
