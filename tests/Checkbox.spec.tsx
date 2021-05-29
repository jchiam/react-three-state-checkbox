import { configure, mount } from 'enzyme';
import * as Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

import Checkbox from '../src/Checkbox';

describe('<Checkbox />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders checkbox', () => {
    const tree = mount(<Checkbox checked />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders checkbox with the right default props', () => {
    const tree = mount(<Checkbox checked={false} />);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('renders checkbox with all props defined', () => {
    const tree = mount(
      <Checkbox
        checked
        indeterminate
        className="test-class"
        style={{ margin: 0 }}
        onChange={jest.fn()}
      />
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('onChange event triggers calls onChange prop', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Checkbox checked onChange={onChange} />);

    // find checkbox
    const result = wrapper.find('input');
    expect(result).toHaveLength(1);
    const checkbox = result.at(0);

    // simulate checkbox change
    expect(onChange).not.toHaveBeenCalled();
    checkbox.simulate('change');
    expect(onChange).toHaveBeenCalled();
  });
});
