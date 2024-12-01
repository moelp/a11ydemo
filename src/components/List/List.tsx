'use client';

import { ReactNode } from 'react';
import { useA11yContext } from '#/utils/a11yContext';
import { twMerge } from 'tailwind-merge';

interface ListProps {
  isA11y?: boolean;
  isOrdered?: boolean;
  isUnstyled?: boolean;
  children: ReactNode;
  className?: string;
}

interface ListItemProps {
  isA11y?: boolean;
  isUnstyled?: boolean;
  children: ReactNode;
  className?: string;
}

export function List({
  isA11y,
  isOrdered,
  isUnstyled,
  children,
  className,
}: ListProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  const SemanticTagUnordered = isA11y ? 'ul' : 'span';
  const SemanticTagOrdered = isA11y ? 'ol' : 'span';
  const SemanticTag = isOrdered ? SemanticTagOrdered : SemanticTagUnordered;

  return (
    <SemanticTag
      className={`${
        isA11y ? '' : 'inline-flex flex-col [counter-reset: list] text-[16px]'
      } ${isOrdered && !isUnstyled ? 'list-decimal' : 'list-disc'} text-start ${
        className ? className : ''
      }`}
      data-test="list">
      {children}
    </SemanticTag>
  );
}

export function ListItem({
  isA11y,
  isUnstyled,
  children,
  className,
}: ListItemProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y || isA11y === false ? isA11y : a11yMode.isSemantic;

  const SemanticTag = isA11y ? 'li' : 'span';
  const classOrdered = isA11y
    ? ''
    : 'before:text-inherit before:[content:counter(list)"."] before:me-2 before:absolute before:start-0 [counter-increment:list]';

  return (
    <SemanticTag
      className={twMerge(
        `relative ${!isUnstyled ? classOrdered : ''} ${
          isA11y ? 'ms-5' : 'ps-[20px] '
        }`,
        className
      )}
      data-test="list-item">
      {children}
    </SemanticTag>
  );
}
