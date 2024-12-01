'use client';

import type { LinkProps } from '#/components/Link/Link';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { useA11yContext } from '#/utils/a11yContext';

import CustomLink from '#/components/Link/Link';

type TypeLinkSkipToContent = Omit<LinkProps, 'href'>;

interface SkipToContentProps extends TypeLinkSkipToContent {
  id: string;
}

export default function SkipToContent({
  isA11y,
  id,
  children,
  variant = 'primary',
  className,
  ...rest
}: SkipToContentProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;
  const pathname = usePathname();

  useEffect(() => {
    console.log('stc pathname', pathname);
    console.log('stc id', id);
    console.log('stc hash', window.location.hash);
    const content = document.getElementById(id);
    if (window.location.hash === `#${id}` && content) {
      content.focus(); // Move focus to the main content
    }
  }, [pathname, id]);

  if (!isA11y) return;

  return (
    <CustomLink
      {...rest}
      href={`#${id}`}
      variant={variant}
      className={twMerge(
        'absolute top-0 start-auto z-40 transform -translate-y-full focus:translate-y-0 motion-safe:transition',
        className
      )}>
      {children}
    </CustomLink>
  );
}
