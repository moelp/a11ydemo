'use client';

import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { useA11yContext } from '#/utils/a11yContext';
import { convertToSlug } from '#/utils/convertToSlug';
import Heading from '#/components/Heading/Heading';
import Copytext from '#/components/Copytext/Copytext';

type SectionProps = {
  isA11y?: boolean;
  children?: ReactNode;
  className?: string;
  asHero?: boolean;
  title: string;
  text?: string;
  isCentered?: boolean;
  isFullHeight?: boolean;
};

export default function Section({
  isA11y,
  children,
  className,
  asHero,
  title,
  text,
  isCentered,
  isFullHeight,
}: SectionProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  const SemanticTag = isA11y && !asHero ? 'section' : 'div';

  const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;

  return (
    <SemanticTag
      id={convertToSlug(title)}
      {...(!isA11y && { 'data-scrolltarget': '' })}
      className={twMerge(
        `border-b-2 border-b-backgroundSecondary ${
          isA11y ? 'py-12' : 'py-[48px]'
        } ${isCentered ? 'text-center' : ''} ${
          isFullHeight ? 'min-h-svh flex flex-col justify-center' : ''
        }`,
        className
      )}
      data-test="page-section">
      <ConditionalWrapper
        condition={isFullHeight}
        wrapper={(children: ReactNode) => (
          <div className="section__inner">{children}</div>
        )}>
        {title && (
          <Heading isA11y={isA11y} as={asHero ? 'h1' : 'h2'}>
            {title}
          </Heading>
        )}
        {text && (
          <Copytext
            isA11y={isA11y}
            size="large"
            className={`${isCentered ? 'ms-auto me-auto' : ''} ${
              isA11y
                ? 'pb-8 lg:pb-12 last:pb-0'
                : 'pb-[32px] lg:pb-[48px] last:pb-0'
            }`}>
            {text}
          </Copytext>
        )}
        {children}
      </ConditionalWrapper>
    </SemanticTag>
  );
}
