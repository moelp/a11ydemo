'use client';

import { ReactNode } from 'react';
import { useA11yContext } from '#/utils/a11yContext';

type PageFooterProps = {
  isA11y?: boolean;
  children: ReactNode;
};

export default function PageFooter({ isA11y, children }: PageFooterProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  const SemanticTag = isA11y ? 'footer' : 'div';

  return (
    <SemanticTag
      className={`footer ${isA11y ? '' : 'text-[16px]'}`}
      data-test="page-footer">
      {children}
    </SemanticTag>
  );
}
