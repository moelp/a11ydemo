'use client';

import React from 'react';
import { useA11yContext } from '#/utils/a11yContext';

type ImageProps = {
  isA11y?: boolean;
  src: string;
  alt: string;
  className?: string;
};

export default function Image({ isA11y, src, alt, className }: ImageProps) {
  const { state: a11yMode } = useA11yContext();
  isA11y = isA11y != undefined ? isA11y : a11yMode.isSemantic;

  if (isA11y) {
    return (
      <img
        className={`w-full object-cover ${
          isA11y ? 'rounded-lg' : 'rounded-[8px]'
        } ${className}`}
        src={src}
        alt={alt}
        data-test="image"
      />
    );
  }
  return (
    <div
      style={{ backgroundImage: `url(${src})` }}
      className={`w-full bg-cover ${
        isA11y ? 'rounded-lg' : 'rounded-[8px]'
      } ${className}`}
      data-test="image"></div>
  );
}
