import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom'

export default function Modal({ children, onClose, className= '', open }) {
  const modalRef = useRef();
  const cssClasses = `bg-[#e4ddd4] rounded-md border-none p-4 w-[80%] max-w-[40rem] backdrop:bg-black/55 ${className}`;
  useEffect(() => {
    const modal = modalRef.current;
    if (open) {
      modal.showModal();  
    }
    return () => modal.close();
  }, [open])

  return createPortal(
    <dialog ref={modalRef} className={cssClasses} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
};

