import { useState } from 'react';

export const useModal = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const toggle = () => setIsOpen(!isOpen);

  return { isOpen, open, close, toggle };
};
