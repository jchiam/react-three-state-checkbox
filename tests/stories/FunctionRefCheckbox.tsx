import Checkbox from '../../src/Checkbox';

const FunctionRefCheckbox = () => (
  <Checkbox
    checked
    ref={(el) => { if (el) el.setAttribute('data-ref-set', 'true'); }}
  />
);

export default FunctionRefCheckbox;
