# react-three-state-checkbox

[![npm](https://img.shields.io/npm/v/react-three-state-checkbox.svg)](https://npmjs.org/package/react-three-state-checkbox)
[![Codecov](https://img.shields.io/codecov/c/github/jchiam/react-three-state-checkbox.svg)](https://github.com/jchiam/react-three-state-checkbox)
[![GitHub last commit](https://img.shields.io/github/last-commit/jchiam/react-three-state-checkbox.svg)](https://github.com/jchiam/react-three-state-checkbox/)
[![license](https://img.shields.io/github/license/jchiam/react-three-state-checkbox.svg)](https://opensource.org/licenses/MIT)

React component for checkbox that supports the indeterminate state conveniently. This component is TypeScript compatible.

## Compatibility

- React 18 or 19
- Node.js >= 22

## Installation
The most straightforward way to use this component in your project is to either use `npm` or `yarn`.
```
# npm
npm i --save react-three-state-checkbox

# yarn
yarn add react-three-state-checkbox
```

Import in your project using the following.
```ts
// Default import
import Checkbox from 'react-three-state-checkbox'

// Named import
import { Checkbox } from 'react-three-state-checkbox'
```

## Usage
This component is a wrapper around the default HTML `input` element.

```tsx
import { useState } from 'react';
import Checkbox from 'react-three-state-checkbox';

export default function App() {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    setIndeterminate(false);
  };

  return (
    <Checkbox
      checked={checked}
      indeterminate={indeterminate}
      onChange={handleChange}
    />
  );
}
```

### Props
| Props          | Type                                              | Description                                      |
| -------------- | ------------------------------------------------- | ------------------------------------------------ |
| checked        | boolean                                           | Boolean value of checkbox's checked state.       |
| indeterminate  | boolean?                                          | Boolean value of checkbox's indeterminate state. |
| className      | string?                                           | Classname to be applied to the input element.    |
| style          | React.CSSProperties?                              | Inline styles to be passed to input element.     |
| disabled       | boolean?                                          | Boolean value of checkbox's disabled state.      |
| onChange       | ((e: ChangeEvent<HTMLInputElement>) => void)?     | Function called when value of checkbox changes.  |

### Styling
There are no additional dom wrappers around the input component. The `className` prop styles the `input` element directly.

# License
MIT Licensed. Copyright (c) Jonathan Chiam 2019-2026.
