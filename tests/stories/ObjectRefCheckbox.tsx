import { useEffect, useRef } from 'react';
import Checkbox from '../../src/Checkbox';

const ObjectRefCheckbox = () => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.setAttribute('data-ref-set', 'true');
  }, []);
  return <Checkbox checked ref={ref} />;
};

export default ObjectRefCheckbox;
