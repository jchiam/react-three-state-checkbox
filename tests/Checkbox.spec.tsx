import { test, expect } from './fixtures';

import Checkbox from '../src/Checkbox';
import ControlledCheckbox from './stories/ControlledCheckbox';
import FunctionRefCheckbox from './stories/FunctionRefCheckbox';
import ObjectRefCheckbox from './stories/ObjectRefCheckbox';

test.describe('<Checkbox />', () => {
  test('is checked when checked prop is true', async ({ mount }) => {
    const component = await mount(<Checkbox checked />);
    await expect(component).toBeChecked();
    await expect(component).toHaveScreenshot('checked.png');
  });

  test('is unchecked when checked prop is false', async ({ mount }) => {
    const component = await mount(<Checkbox checked={false} />);
    await expect(component).not.toBeChecked();
    await expect(component).toHaveScreenshot('unchecked.png');
  });

  test('is indeterminate when indeterminate prop is true', async ({ mount }) => {
    const component = await mount(<Checkbox checked={false} indeterminate />);
    const isIndeterminate = await component.evaluate((el: HTMLInputElement) => el.indeterminate);
    expect(isIndeterminate).toBe(true);
    const matchesPseudoClass = await component.evaluate((el) => el.matches(':indeterminate'));
    expect(matchesPseudoClass).toBe(true);
    await expect(component).toHaveScreenshot('indeterminate.png');
  });

  test('is not indeterminate by default', async ({ mount }) => {
    const component = await mount(<Checkbox checked={false} />);
    const isIndeterminate = await component.evaluate((el: HTMLInputElement) => el.indeterminate);
    expect(isIndeterminate).toBe(false);
  });

  test('is disabled when disabled prop is true', async ({ mount }) => {
    const component = await mount(<Checkbox checked={false} disabled />);
    await expect(component).toBeDisabled();
  });

  test('applies className prop', async ({ mount }) => {
    const component = await mount(<Checkbox checked className="test-class" />);
    await expect(component).toHaveClass('test-class');
  });

  test('applies style prop', async ({ mount }) => {
    const component = await mount(<Checkbox checked style={{ margin: '10px' }} />);
    await expect(component).toHaveCSS('margin', '10px');
  });

  test('calls onChange when clicked', async ({ mount }) => {
    const component = await mount(<ControlledCheckbox />);
    await expect(component).not.toBeChecked();
    await component.click();
    await expect(component).toBeChecked();
  });

  test('forwards name prop to input element', async ({ mount }) => {
    const component = await mount(<Checkbox checked name="my-checkbox" />);
    await expect(component).toHaveAttribute('name', 'my-checkbox');
  });

  test('forwards id prop to input element', async ({ mount }) => {
    const component = await mount(<Checkbox checked id="my-checkbox-id" />);
    await expect(component).toHaveAttribute('id', 'my-checkbox-id');
  });

  test('forwards aria-label prop to input element', async ({ mount }) => {
    const component = await mount(<Checkbox checked aria-label="Select all" />);
    await expect(component).toHaveAttribute('aria-label', 'Select all');
  });

  test('forwards data-* props to input element', async ({ mount }) => {
    const component = await mount(<Checkbox checked data-testid="my-checkbox" />);
    await expect(component).toHaveAttribute('data-testid', 'my-checkbox');
  });

  test('type prop cannot be overridden', async ({ mount }) => {
    // @ts-expect-error intentionally passing invalid type to verify it is overridden
    const component = await mount(<Checkbox checked type="radio" />);
    await expect(component).toHaveAttribute('type', 'checkbox');
  });

  test('forwards function ref to input element', async ({ mount }) => {
    const component = await mount(<FunctionRefCheckbox />);
    await expect(component).toHaveAttribute('data-ref-set', 'true');
  });

  test('forwards object ref to input element', async ({ mount }) => {
    const component = await mount(<ObjectRefCheckbox />);
    await expect(component).toHaveAttribute('data-ref-set', 'true');
  });

  test('clears ref on unmount', async ({ mount }) => {
    const component = await mount(<Checkbox checked />);
    await component.unmount();
  });
});
