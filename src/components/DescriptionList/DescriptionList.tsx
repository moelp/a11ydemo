'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { useA11yContext } from '#/utils/a11yContext';

interface DescriptionListProps {
  isA11y?: boolean;
  children: ReactNode;
  className?: string;
}

export function DescriptionList({
  isA11y,
  children,
  className,
}: DescriptionListProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  const SemanticTag = isA11y ? 'dl' : 'span';

  return (
    <div className="@container/dl">
      <SemanticTag
        className={twMerge(
          'grid @sm/dl:grid-cols-[auto_minmax(0,_1fr)]',
          className
        )}
        data-test="description-list">
        {children}
      </SemanticTag>
    </div>
  );
}

export function DescriptionListTag({
  isA11y,
  children,
  className,
}: DescriptionListProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y ? isA11y : a11yMode.isSemantic;

  const SemanticTag = isA11y ? 'dt' : 'span';

  return (
    <SemanticTag
      className={twMerge(
        ` flex items-center @sm/dl:border-b @sm/dl:border-dotted border-b-foregroundMuted [&:nth-last-child(2)]:border-transparent last-of-type:border-transparent ${
          isA11y
            ? 'px-4 pt-4 @sm/dl:p-4'
            : 'px-[16px] pt-[16px] @sm/dl:p-[16px]'
        }`,
        className
      )}>
      {children}
    </SemanticTag>
  );
}

export function DescriptionListDescription({
  isA11y,
  children,
  className,
}: DescriptionListProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y ? isA11y : a11yMode.isSemantic;

  const SemanticTag = isA11y ? 'dd' : 'span';

  return (
    <SemanticTag
      className={twMerge(
        `flex items-center border-b border-dotted border-b-foregroundMuted last-of-type:border-transparent ${
          isA11y ? 'p-4 max-w-prose' : 'p-[16px]'
        }`,
        className
      )}>
      {children}
    </SemanticTag>
  );
}
