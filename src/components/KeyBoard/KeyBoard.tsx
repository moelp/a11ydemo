'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { useA11yContext } from '#/utils/a11yContext';

type KeyboardProps = {
  isA11y?: boolean;
  caption: string;
  children: ReactNode;
  className?: string;
};

export default function Keyboard({
  isA11y,
  caption,
  children,
  className,
}: KeyboardProps) {
  const { state: a11yMode } = useA11yContext();

  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  const SemanticTag = isA11y ? 'figure' : 'span';
  const classa11y = isA11y
    ? 'gap-1 p-2 rounded-md'
    : 'gap-[4px] p-[8px] rounded-[6px] text-[16px]';

  return (
    <SemanticTag
      className="inline-flex"
      {...(isA11y && { 'aria-label': caption })}>
      <span
        className={twMerge(
          `inline-flex items-center border-2 border-foreground text-foreground ${classa11y}`,
          className
        )}
        {...(isA11y && { 'aria-hidden': isA11y })}
        data-test="keyboard">
        {children}
      </span>
      {isA11y && <figcaption className="sr-only">{caption}</figcaption>}
    </SemanticTag>
  );
}
