'use client';

import React from 'react';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { useA11yContext } from '#/utils/a11yContext';

type FigureProps = {
  isA11y?: boolean;
  children: ReactNode;
  caption: string;
  isScreenReaderCaption?: boolean;
  className?: string;
};

export default function Figure({
  isA11y,
  children,
  caption,
  isScreenReaderCaption,
  className,
}: FigureProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  const SemanticTag = isA11y ? 'figure' : 'div';
  const SemanticTagCaption = isA11y ? 'figcaption' : 'span';

  return (
    <SemanticTag
      className={twMerge(`${isA11y ? '' : 'leading-none'}`, className)}
      {...(isA11y && { 'aria-label': caption })}
      data-test="figure">
      {children}
      <SemanticTagCaption
        className={`inline-flex ${
          isA11y ? 'pt-2' : 'pt-[8px] text-[16px] leading-[24px]'
        } ${isScreenReaderCaption ? 'sr-only' : ''}`}>
        {caption}
      </SemanticTagCaption>
    </SemanticTag>
  );
}
