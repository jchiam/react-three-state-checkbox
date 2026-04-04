import { useState } from 'react';
import Checkbox from '../../src/Checkbox';

const ControlledCheckbox = () => {
  const [checked, setChecked] = useState(false);
  return <Checkbox checked={checked} onChange={() => setChecked(true)} />;
};

export default ControlledCheckbox;
