'use client';

import React from 'react';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { useA11yContext } from '#/utils/a11yContext';
import { convertToSlug } from '#/utils/convertToSlug';

type HeadingProps = {
  isA11y?: boolean;
  children: ReactNode;
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  id?: string;
  className?: string;
};

export default function Heading({
  isA11y,
  children,
  as = 'h2',
  id,
  className,
}: HeadingProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  const SemanticTag = isA11y ? as : 'div';
  let fontSize = '';

  switch (as) {
    case 'h1':
      fontSize = isA11y
        ? 'text-7xl lg:text-8xl mb-[0.25em]'
        : 'text-[72px] lg:text-[96px] mb-[18px]';
      break;
    case 'h2':
      fontSize = isA11y
        ? 'text-4xl lg:text-5xl mb-[0.5em]'
        : 'text-[36px] lg:text-[48px] mb-[18px]';
      break;
    case 'h3':
      fontSize = isA11y
        ? 'text-xl lg:text-2xl mb-3'
        : 'text-[20px] lg:text-[24px] mb-[12px]';
      break;
    case 'h4':
      fontSize = isA11y ? 'text-lg lg:text-xl' : 'text-[18px] lg:text-[20px]';
      break;
    case 'h5':
      fontSize = isA11y ? 'text-base lg:text-lg' : 'text-[16px] lg:text-[18px]';
      break;
    case 'h6':
      fontSize = isA11y ? 'text-sm lg:text-base' : 'text-[14px] lg:text-[16px]';
      break;
  }

  return (
    <SemanticTag
      id={id ? convertToSlug(id) : undefined}
      className={twMerge(
        `${fontSize} text-foreground font-extrabold leading-none tracking-tight break-words`,
        className
      )}
      data-test="heading">
      {children}
    </SemanticTag>
  );
}
