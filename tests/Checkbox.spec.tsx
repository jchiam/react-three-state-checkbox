import { test, expect } from './fixtures';

import Checkbox from '../src/Checkbox';
import ControlledCheckbox from './stories/ControlledCheckbox';

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
});
