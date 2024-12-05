'use client';

import { useState, useRef } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import { twMerge } from 'tailwind-merge';

import { useA11yContext } from '#/utils/a11yContext';

import Button from '#/components/Button/Button';
import { Modal, ModalHandle } from '#/components/Modal/Modal';

interface ModalExampleProps {
  isA11y?: boolean;
}

export default function ModalExample({ isA11y }: ModalExampleProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  const refModalExample = useRef<ModalHandle>(null);
  const [isModalExampleOpen, setIsModalExampleOpen] = useState<
    boolean | undefined
  >(false);

  const handleOpenModalExample = () => {
    refModalExample.current?.open();
    //console.log('ModalExample State', refModalExample.current?.getState());
    //console.log('isModalExampleOpen', isModalExampleOpen);
    //const modalState = refModalExample.current?.getState();
    setIsModalExampleOpen(true); // Set isModalOpen to true when opening
  };

  const handleCloseModalExample = () => {
    refModalExample.current?.close();
    //console.log('ModalExample State', refModalExample.current?.getState());
    //console.log('isModalExampleOpen', isModalExampleOpen);
    //const modalState = refModalExample.current?.getState();
    setIsModalExampleOpen(false); // Set isModalOpen to false when closing
  };

  return (
    <>
      <Button
        //onClick={isA11y ? toggleModal : toggleModalNotA11y}
        onClick={() => handleOpenModalExample()}
        {...(isA11y && { 'aria-haspopup': 'dialog' })}
        {...(isA11y && {
          'aria-expanded': isModalExampleOpen,
        })}>
        Open Modal
      </Button>
      <Modal
        ref={refModalExample}
        initialOpened={isModalExampleOpen}
        onClose={handleCloseModalExample}>
        <p>This is the {isA11y ? 'semantic' : `non semantic`} modal content</p>
      </Modal>
    </>
  );
}
