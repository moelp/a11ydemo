'use client';

// import type { LinkHTMLAttributes, ButtonHTMLAttributes } from 'react';

import React from 'react';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';

import { useA11yContext } from '#/utils/a11yContext';

// interface FakeLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   isA11y: boolean;
//   href: string;
//   children: ReactNode;
//   hasIcon?: boolean;
//   variant?: 'inline' | 'primary' | 'actionable';
//   onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
//   className?: string;
// }

export interface LinkProps {
  isA11y?: boolean;
  href: string;
  target?: '_blank';
  children: ReactNode;
  hasIcon?: boolean;
  variant?: 'inline' | 'primary' | 'actionable';
  onClick?: () => void;
  className?: string;
}

export default function CustomLink({
  isA11y,
  href,
  target,
  onClick,
  children,
  hasIcon = true,
  variant = 'inline',
  className,
  ...rest
}: LinkProps) {
  const { state: a11yMode } = useA11yContext();

  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  const showLinkAsButton = a11yMode.linkAsButton;

  const SemanticButton = showLinkAsButton ? 'button' : 'span';

  const classa11y = isA11y
    ? 'gap-1 rounded-lg'
    : 'text-[16px] gap-[4px] rounded-[8px]';
  const classActionable = isA11y ? 'no-underline hover:underline' : '';
  const classInline = isA11y ? 'underline hover:no-underline' : '';
  const classFocus = isA11y
    ? 'ring-offset-background focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-primary'
    : '';

  const classPrimary =
    'ring-offset-current text-foregroundOnPrimary bg-primary hover:bg-primaryHover';
  const classPrimaryA11y = isA11y
    ? 'px-5 py-3 underline hover:no-underline'
    : 'px-[20px] py-[12px]';

  // const classLink = `${classa11y} inline-flex items-center justify-center font-medium rounded-lg text-foreground contrast-more:text-primary
  // ${variant === 'inline' ? classInline : ''}
  // ${variant === 'actionable' ? classActionable : ''}
  // ${
  //   variant === 'primary' ? `${classPrimary} ${classPrimaryA11y}` : ''
  // } ${className}`;

  const classLink = twMerge(
    `${classa11y} ${classFocus} inline-flex items-center justify-center font-medium text-foreground 
  ${variant === 'inline' ? classInline : ''}
  ${variant === 'actionable' ? classActionable : ''} 
  ${variant === 'primary' ? `${classPrimary} ${classPrimaryA11y}` : ''}`,
    className
  );

  function linkToPage() {
    window.location.href = href;
  }

  if (!isA11y || showLinkAsButton === true) {
    return (
      <SemanticButton
        className={`${classLink}`}
        onClick={linkToPage}
        {...rest}
        data-test="link">
        {children}

        {hasIcon && (
          <IconArrowRight
            className={`${
              isA11y ? 'size-5 ms-1' : 'ms-[4px] size-[20px]'
            } rtl:rotate-180 origin-center`}
          />
        )}
      </SemanticButton>
    );
  }

  return (
    <Link
      href={href}
      target={target}
      onClick={onClick}
      className={`${classLink}`}
      {...rest}>
      {children}
      {hasIcon && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          className={`${
            isA11y ? 'size-5 ms-2' : 'ms-[8px] size-[20px]'
          } rtl:rotate-180`}
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </Link>
  );
}
