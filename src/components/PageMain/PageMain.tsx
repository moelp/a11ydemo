'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { useA11yContext } from '#/utils/a11yContext';

interface PageMainProps extends React.HTMLAttributes<HTMLDivElement> {
  isA11y?: boolean;
  id?: string;
  children: ReactNode;
  className?: string;
}

export default function PageMain({
  isA11y,
  id,
  children,
  className,
  ...rest
}: PageMainProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;
  const SemanticTag = isA11y ? 'main' : 'div';

  return (
    <SemanticTag
      id={id}
      className={twMerge('main', className)}
      data-test="page-main"
      {...rest}>
      {children}
    </SemanticTag>
  );
}
