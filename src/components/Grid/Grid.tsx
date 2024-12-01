'use client';

import React from 'react';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { useA11yContext } from '#/utils/a11yContext';

type GridProps = {
  isA11y?: boolean;
  children: ReactNode;
  className?: string;
};

export default function Grid({ isA11y, children, className }: GridProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  const classColumnGap = isA11y
    ? 'gap-8 lg:gap-12'
    : 'gap-[32px] lg:gap-[48px]';

  const classGridAutoWrap = isA11y
    ? 'sm:grid-cols-autowrap'
    : 'sm:grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))]';

  return (
    <div
      className={twMerge(
        `grid mx-auto ${classGridAutoWrap} ${classColumnGap}`,
        className
      )}
      data-test="figure">
      {children}
    </div>
  );
}
