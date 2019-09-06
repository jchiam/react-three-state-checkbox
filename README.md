# react-three-state-checkbox

[![npm](https://img.shields.io/npm/v/react-three-state-checkbox.svg)](https://npmjs.org/package/react-three-state-checkbox)
[![Codecov](https://img.shields.io/codecov/c/github/jchiam/react-three-state-checkbox.svg)]()
[![GitHub last commit](https://img.shields.io/github/last-commit/jchiam/react-three-state-checkbox.svg)](https://github.com/jchiam/react-three-state-checkbox/)
[![license](https://img.shields.io/github/license/jchiam/react-three-state-checkbox.svg)](https://opensource.org/licenses/MIT)

React component for checkbox that supports the indeterminate state conveniently. This component is TypeScript compatible.

## Installation
The most straightforward way to use this component in your project is to either use `npm` or `yarn`.
```
# npm
npm i --save react-three-state-checkbox

# yarn
yarn add react-three-state-checkbox
```

Import in your project using the following.
```
import Checkbox from 'react-three-state-checkbox'
```

## Usage
This component is a wrapper around the default HTML `input` element.

```js
import React, { Component } from 'react';
import Checkbox from 'react-three-state-checkbox';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      indeterminate: false
    };
  }

  handleChange = () => { ... };

  render() {
    const { checked, indeterminate } = this.state;
    return (
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        onChange={this.handleChange}
      />
    );
  }
}
```

### Props
| Props          | Type                 | Description                                      |
| -------------- | -------------------- | ------------------------------------------------ |
| className      | string?              | Classname to be applied to the input element.    |
| style          | React.CSSProperties? | Inline styles to be passed to input element.     | 
| checked        | boolean              | Boolean value of checkbox's checked state.       |
| indeterminate  | boolean?             | Boolean value of checkbox's indeterminate state. |
| disabled       | boolean?             | Boolean value of checkbox's disabled state.      |
| onChange       | () => {}?            | Function called when value of checkbox changes.  |

### Styling
There are no additional dom wrappers around the input component. The `className` prop styles the `input` element directly.

# License
MIT Licensed. Copyright (c) Jonathan Chiam 2019.
