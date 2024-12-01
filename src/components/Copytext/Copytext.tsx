'use client';

import React from 'react';
import { ReactNode } from 'react';
import { useA11yContext } from '#/utils/a11yContext';

type CopytextProps = {
  isA11y?: boolean;
  children: ReactNode;
  as?: 'span' | 'p';
  size?: 'small' | 'default' | 'large';
  isFullWidth?: boolean;
  className?: string;
};

export default function Copytext({
  isA11y,
  children,
  as = 'p',
  size = 'default',
  isFullWidth = false,
  className,
}: CopytextProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  const NotSemanticTag = as === 'p' ? 'div' : 'span';
  const SemanticTag = isA11y ? as : NotSemanticTag;
  const classFullWidth = isFullWidth ? '' : 'max-w-prose';
  let fontSize = '';

  switch (size) {
    case 'small':
      fontSize = isA11y ? 'text-sm lg:text-base' : 'text-[14px] lg:text-[16px]';
      break;
    case 'default':
      fontSize = isA11y ? 'text-base lg:text-lg' : 'text-[16px] lg:text-[18px]';
      break;
    case 'large':
      fontSize = isA11y ? 'text-lg lg:text-xl' : 'text-[18px] lg:text-[20px]';
      break;
  }

  return (
    <SemanticTag
      className={`text-foregroundMuted ${fontSize} ${classFullWidth} ${className}`}>
      {children}
    </SemanticTag>
  );
}
