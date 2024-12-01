'use client';

import React, {
  ReactNode,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { useA11yContext } from '#/utils/a11yContext';

import Button from '#/components/Button/Button';

import styles from '#/components/Modal/Modal.module.scss';

export interface ModalHandle {
  open: () => void;
  close: () => void;
  getState: () => boolean;
}

interface ModalProps {
  isA11y?: boolean;
  children: ReactNode;
  initialOpened?: boolean;
  position?: 'center' | 'right';
  onClose?: () => void;
}

export const Modal = forwardRef<ModalHandle, ModalProps>(function Modal(
  { isA11y, children, initialOpened = false, position = 'center', onClose },
  ref
) {
  const [isOpen, setIsOpen] = useState(initialOpened);
  const dialogRef = useRef<HTMLDialogElement | HTMLDivElement | null>(null);
  const isOpenRef = useRef(isOpen);

  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  const SemanticTag: 'dialog' | 'div' = isA11y ? 'dialog' : 'div';

  const openDialog = () => {
    if (!isA11y) return;
    if (
      dialogRef.current instanceof HTMLDialogElement &&
      !dialogRef.current.open
    ) {
      dialogRef.current.showModal();
      isOpenRef.current = true;
    }
  };

  const closeDialog = () => {
    if (!isA11y) return;
    if (
      dialogRef.current instanceof HTMLDialogElement &&
      dialogRef.current.open
    ) {
      dialogRef.current.close();
      isOpenRef.current = false;
    }
  };

  useEffect(() => {
    isOpenRef.current = isOpen;
    console.log('modal isOpen', isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isA11y) {
      dialogRef.current?.classList.remove(
        'block',
        'visible',
        'hidden',
        'invisible'
      );
    }
  }, [isA11y]);

  useEffect(() => {
    if (!isA11y) return;

    const dialogElement = dialogRef.current;

    const handleClose = () => {
      isOpenRef.current = false;
      if (onClose) onClose();
    };
    dialogElement?.addEventListener('close', handleClose);

    return () => {
      dialogElement?.removeEventListener('close', handleClose);
    };
  }, [isA11y, onClose]);

  useImperativeHandle(ref, () => ({
    open() {
      openDialog();
      setIsOpen(true);
    },
    close() {
      closeDialog();
      setIsOpen(false);
    },
    getState: () => isOpenRef.current,
  }));

  const classPosition =
    position === 'right'
      ? 'start-auto end-0 top-0 m-0 w-80 h-screen rounded-s-2xl'
      : 'start-0 end-0 top-0 bottom-0 m-auto w-fit h-fit rounded-2xl';

  return createPortal(
    <SemanticTag
      ref={(element: HTMLDialogElement | HTMLDivElement | null) => {
        dialogRef.current = element;
      }}
      className={`${
        position === 'center' && styles.modalCenter
      } modal fixed text-foregroundMutedOnSecondary bg-backgroundLevel1 shadow-2xl p-4 max-h-screen motion-safe:duration-300 z-50 ${classPosition} ${
        position === 'right' &&
        (isOpen === true
          ? 'translate-x-0'
          : 'translate-x-full rtl:-translate-x-full')
      } ${
        position === 'center' &&
        (isA11y
          ? ''
          : isOpen === true
          ? `${styles.isOpen}`
          : `${styles.modalCenter}`)
      }`}
      data-test="modal">
      <Button
        isA11y={isA11y}
        autoFocus={isA11y}
        onClick={() => {
          if (onClose) {
            onClose();
          } else if (ref && 'current' in ref && ref.current?.close) {
            ref.current.close();
          }
        }}>
        Close
      </Button>
      {children}
    </SemanticTag>,
    document.body
  );
});
