'use client';

import React from 'react';
import { ReactNode } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { useA11yContext } from '#/utils/a11yContext';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isA11y?: boolean;
  children: ReactNode;
  iconOnly?: boolean;
  autoFocus?: boolean;
  variant?: 'primary' | 'ghost';
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

export default function Button({
  isA11y,
  onClick,
  children,
  autoFocus,
  variant = 'primary',
  iconOnly,
  className,
  ...rest
}: ButtonProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  const SemanticTag = isA11y ? 'button' : 'span';

  const classFocus = isA11y
    ? 'ring-offset-current focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-primary'
    : '';

  const classPrimary =
    'text-foregroundOnPrimary bg-primary hover:bg-primaryHover';
  const classPrimaryA11y = isA11y ? 'px-5 py-3' : 'px-[20px] py-[12px]';

  const classVariant =
    variant === 'ghost'
      ? 'text-foreground hover:bg-backgroundMuted'
      : `${classPrimary} ${classPrimaryA11y}`;

  const classPadding = isA11y ? 'px-5 py-3' : 'px-[20px] py-[12px]';
  const classPaddingIconOnly = isA11y ? 'px-3 py-3' : 'px-[12px] py-[12px]';
  const classIcon = iconOnly ? classPaddingIconOnly : classPadding;
  const classFontSize = isA11y ? 'rounded-lg' : 'text-[16px] rounded-[8px]';

  return (
    <SemanticTag
      className={`inline-flex font-medium border-2 border-solid border-transparent h-fit ${classFocus} ${classFontSize} ${classVariant} ${classIcon} ${className}`}
      autoFocus={autoFocus}
      onClick={onClick}
      {...rest}
      data-test="button">
      {children}
    </SemanticTag>
  );
}
