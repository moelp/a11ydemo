'use client';

import { ReactNode } from 'react';
import { useA11yContext } from '#/utils/a11yContext';

type PageAsideProps = {
  isA11y?: boolean;
  children: ReactNode;
  className?: string;
};

export default function PageAside({
  isA11y,
  children,
  className,
  ...rest
}: PageAsideProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  const SemanticTag = isA11y ? 'aside' : 'div';

  return (
    <SemanticTag
      className={`aside ${className}`}
      {...rest}
      data-test="page-aside">
      {children}
    </SemanticTag>
  );
}
