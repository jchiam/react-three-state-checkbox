import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from '../src/Checkbox';

describe('<Checkbox />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders checkbox', () => {
    expect(renderer.create(
      <Checkbox checked />
    ).toJSON()).toMatchSnapshot();
  });

  it('renders checkbox with the right default props', () => {
    expect(renderer.create(
      <Checkbox checked={false} />
    ).toJSON()).toMatchSnapshot();
  });

  it('renders checkbox with all props defined', () => {
    expect(renderer.create(
      <Checkbox
        checked
        indeterminate
        className="test-class"
        style={{ margin: 0 }}
        onChange={jest.fn()}
      />
    ).toJSON()).toMatchSnapshot();;
  });

  it('onChange event triggers calls onChange prop', async () => {
    const user = userEvent.setup();

    const onChange = jest.fn();
    render(<Checkbox checked={false} onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox');

    // simulate checkbox change
    expect(onChange).not.toHaveBeenCalled();
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(onChange).toHaveBeenCalled();
    expect(checkbox).toBeChecked();
  });
});
